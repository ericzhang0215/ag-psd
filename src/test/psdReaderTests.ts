import * as fs from 'fs';
import * as path from 'path';
import { expect } from 'chai';
import { readPSD, importPSD, importPSDImages, compareCanvases, saveCanvas, ensureDirectory } from './common';
import { Layer } from '../psd';
import PsdReader from '../psdReader';
import ArrayBufferPsdReader from '../arrayBufferPsdReader';
import BufferPsdReader from '../bufferPsdReader';

const readFilesPath = path.join(__dirname, '..', '..', 'test', 'read');
const resultsFilesPath = path.join(__dirname, '..', '..', 'results');

describe('PsdReader', function () {
	it('should throw exceptions for all read methods in base class', function () {
		let reader = new PsdReader();
		expect(() => reader.readInt8(), 'readInt8').throw('Not implemented');
		expect(() => reader.readUint8(), 'readUint8').throw('Not implemented');
		expect(() => reader.readInt16(), 'readInt16').throw('Not implemented');
		expect(() => reader.readUint16(), 'readUint16').throw('Not implemented');
		expect(() => reader.readInt32(), 'readInt32').throw('Not implemented');
		expect(() => reader.readUint32(), 'readUint32').throw('Not implemented');
		expect(() => reader.readFloat32(), 'readFloat32').throw('Not implemented');
		expect(() => reader.readFloat64(), 'readFloat64').throw('Not implemented');
		expect(() => reader.readBytes(1), 'readBytes').throw('Not implemented');
		expect(() => reader.createCanvas(1, 1), 'createCanvas').throw('Not implemented');
	});

	[new ArrayBufferPsdReader(new ArrayBuffer(1000)), new BufferPsdReader(new Buffer(1000))].forEach(reader => {
		it(`should work for all overloaded methods (${(<any>reader.constructor).name})`, function () {
			reader.readInt8();
			reader.readUint8();
			reader.readInt16();
			reader.readUint16();
			reader.readInt32();
			reader.readUint32();
			reader.readFloat32();
			reader.readFloat64();
			reader.readBytes(1);
		});
	});

	it('should read width and height properly', function () {
		let psd = readPSD(path.join(readFilesPath, 'groups', 'src.psd'));
		expect(psd.width).equal(300);
		expect(psd.height).equal(200);
	});

	fs.readdirSync(readFilesPath).forEach(f => {
		it(`should properly read PSD file (${f})`, function () {
			let basePath = path.join(readFilesPath, f);
			let psd = readPSD(path.join(basePath, 'src.psd'));
			let expected = importPSD(basePath);
			let images = importPSDImages(basePath);
			let compare: { name: string; canvas: HTMLCanvasElement; }[] = [];

			compare.push({ name: `canvas.png`, canvas: psd.canvas });
			psd.canvas = null;

			let i = 0;

			function pushLayerCanvases(layers: Layer[]) {
				layers.forEach(l => {
					if (l.children) {
						pushLayerCanvases(l.children);
					} else {
						compare.push({ name: `layer-${i++}.png`, canvas: l.canvas });
						l.canvas = null;
					}
				});
			}

			pushLayerCanvases(psd.children || []);
			ensureDirectory(path.join(resultsFilesPath, f));
			compare.forEach(i => saveCanvas(path.join(resultsFilesPath, f, i.name), i.canvas));
			fs.writeFileSync(path.join(resultsFilesPath, f, 'data.json'), JSON.stringify(psd, null, 2), 'utf8');

			expect(psd).eql(expected, f);
			compare.forEach(i => compareCanvases(images[i.name] || null, i.canvas || null, `${f}:${i.name}`));
		});
	});
});
