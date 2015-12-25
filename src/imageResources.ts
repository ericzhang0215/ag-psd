﻿import { ImageResources } from './psd';
import PsdReader from './psdReader';
import PsdWriter from './psdWriter';

export let imageResources: [number, number, string][] = [
	[0x03E8, 1000, '(Obsolete--Photoshop 2.0 only) Contains five 2- byte values: number of channels, rows, columns, depth, and mode'],
	[0x03E9, 1001, 'Macintosh print manager print info record'],
	[0x03EB, 1003, '(Obsolete--Photoshop 2.0 only) Indexed color table'],
	[0x03ED, 1005, 'ResolutionInfo structure.See Appendix A in Photoshop API Guide.pdf.'],
	[0x03EE, 1006, 'Names of the alpha channels as a series of Pascal strings.'],
	[0x03EF, 1007, '(Obsolete) See ID 1077DisplayInfo structure.See Appendix A in Photoshop API Guide.pdf.'],
	[0x03F0, 1008, 'The caption as a Pascal string.'],
	[0x03F1, 1009, 'Border information.Contains a fixed number (2 bytes real, 2 bytes fraction) for the border width, and 2 bytes for border units (1 = inches, 2 = cm, 3 = points, 4 = picas, 5 = columns).'],
	[0x03F2, 1010, 'Background color.See See Color structure.'],
	[0x03F3, 1011, 'Print flags.A series of one- byte boolean values (see Page Setup dialog): labels, crop marks, color bars, registration marks, negative, flip, interpolate, caption, print flags.'],
	[0x03F4, 1012, 'Grayscale and multichannel halftoning information'],
	[0x03F5, 1013, 'Color halftoning information'],
	[0x03F6, 1014, 'Duotone halftoning information'],
	[0x03F7, 1015, 'Grayscale and multichannel transfer function'],
	[0x03F8, 1016, 'Color transfer functions'],
	[0x03F9, 1017, 'Duotone transfer functions'],
	[0x03FA, 1018, 'Duotone image information'],
	[0x03FB, 1019, 'Two bytes for the effective black and white values for the dot range'],
	[0x03FC, 1020, '(Obsolete)'],
	[0x03FD, 1021, 'EPS options'],
	[0x03FE, 1022, 'Quick Mask information. 2 bytes containing Quick Mask channel ID; 1- byte boolean indicating whether the mask was initially empty.'],
	[0x03FF, 1023, '(Obsolete)'],
	[0x0400, 1024, 'Layer state information. 2 bytes containing the index of target layer (0 = bottom layer).'],
	[0x0401, 1025, 'Working path (not saved).See See Path resource format.'],
	[0x0402, 1026, 'Layers group information. 2 bytes per layer containing a group ID for the dragging groups.Layers in a group have the same group ID.'],
	[0x0403, 1027, '(Obsolete)'],
	[0x0404, 1028, 'IPTC - NAA record.Contains the File Info... information.See the documentation in the IPTC folder of the Documentation folder.'],
	[0x0405, 1029, 'Image mode for raw format files'],
	[0x0406, 1030, 'JPEG quality.Private.'],
	[0x0408, 1032, '(Photoshop 4.0) Grid and guides information.See See Grid and guides resource format.'],
	[0x0409, 1033, '(Photoshop 4.0) Thumbnail resource for Photoshop 4.0 only.See See Thumbnail resource format.'],
	[0x040A, 1034, '(Photoshop 4.0) Copyright flag.Boolean indicating whether image is copyrighted.Can be set via Property suite or by user in File Info...'],
	[0x040B, 1035, '(Photoshop 4.0) URL.Handle of a text string with uniform resource locator.Can be set via Property suite or by user in File Info...'],
	[0x040C, 1036, '(Photoshop 5.0) Thumbnail resource (supersedes resource 1033).See See Thumbnail resource format.'],
	[0x040D, 1037, '(Photoshop 5.0) Global Angle. 4 bytes that contain an integer between 0 and 359, which is the global lighting angle for effects layer.If not present, assumed to be 30.'],
	[0x040E, 1038, '(Obsolete) See ID 1073 below. (Photoshop 5.0) Color samplers resource.See See Color samplers resource format.'],
	[0x040F, 1039, '(Photoshop 5.0) ICC Profile.The raw bytes of an ICC (International Color Consortium) format profile.See ICC1v42_2006 - 05.pdf in the Documentation folder and icProfileHeader.h in Sample Code\\Common\\Includes .'],
	[0x0410, 1040, '(Photoshop 5.0) Watermark.One byte.'],
	[0x0411, 1041, '(Photoshop 5.0) ICC Untagged Profile. 1 byte that disables any assumed profile handling when opening the file. 1 = intentionally untagged.'],
	[0x0412, 1042, '(Photoshop 5.0) Effects visible. 1- byte global flag to show/ hide all the effects layer.Only present when they are hidden.'],
	[0x0413, 1043, '(Photoshop 5.0) Spot Halftone. 4 bytes for version, 4 bytes for length, and the variable length data.'],
	[0x0414, 1044, '(Photoshop 5.0) Document - specific IDs seed number. 4 bytes: Base value, starting at which layer IDs will be generated (or a greater value if existing IDs already exceed it). Its purpose is to avoid the case where we add layers, flatten, save, open, and then add more layers that end up with the same IDs as the first set.'],
	[0x0415, 1045, '(Photoshop 5.0) Unicode Alpha Names. Unicode string'],
	[0x0416, 1046, '(Photoshop 6.0) Indexed Color Table Count. 2 bytes for the number of colors in table that are actually defined'],
	[0x0417, 1047, '(Photoshop 6.0) Transparency Index. 2 bytes for the index of transparent color, if any.'],
	[0x0419, 1049, '(Photoshop 6.0) Global Altitude. 4 byte entry for altitude'],
	[0x041A, 1050, '(Photoshop 6.0) Slices.See See Slices resource format.'],
	[0x041B, 1051, '(Photoshop 6.0) Workflow URL. Unicode string'],
	[0x041C, 1052, '(Photoshop 6.0) Jump To XPEP. 2 bytes major version, 2 bytes minor version, 4 bytes count. Following is repeated for count: 4 bytes block size, 4 bytes key, if key = \'jtDd\' , then next is a Boolean for the dirty flag; otherwise it\'s a 4 byte entry for the mod date.'],
	[0x041D, 1053, '(Photoshop 6.0) Alpha Identifiers. 4 bytes of length, followed by 4 bytes each for every alpha identifier.'],
	[0x041E, 1054, '(Photoshop 6.0) URL List. 4 byte count of URLs, followed by 4 byte long, 4 byte ID, and Unicode string for each count.'],
	[0x0421, 1057, '(Photoshop 6.0) Version Info. 4 bytes version, 1 byte hasRealMergedData , Unicode string:  writer name,  Unicode string:  reader name, 4 bytes file version.'],
	[0x0422, 1058, '(Photoshop 7.0) EXIF data 1. See http://www.kodak.com/global/plugins/acrobat/en/service/digCam/exifStandard2.pdf'],
	[0x0423, 1059, '(Photoshop 7.0) EXIF data 3. See http://www.kodak.com/global/plugins/acrobat/en/service/digCam/exifStandard2.pdf'],
	[0x0424, 1060, '(Photoshop 7.0) XMP metadata.File info as XML description.See http://www.adobe.com/devnet/xmp/'],
	[0x0425, 1061, '(Photoshop 7.0) Caption digest. 16 bytes: RSA Data Security, MD5 message- digest algorithm'],
	[0x0426, 1062, '(Photoshop 7.0) Print scale. 2 bytes style (0 = centered, 1 = size to fit, 2 = user defined). 4 bytes x location (floating point). 4 bytes y location (floating point). 4 bytes scale (floating point)'],
	[0x0428, 1064, '(Photoshop CS) Pixel Aspect Ratio. 4 bytes (version = 1 or 2), 8 bytes double, x / y of a pixel.Version 2, attempting to correct values for NTSC and PAL, previously off by a factor of approx. 5%.'],
	[0x0429, 1065, '(Photoshop CS) Layer Comps. 4 bytes (descriptor version = 16), Descriptor(see See Descriptor structure)'],
	[0x042A, 1066, '(Photoshop CS) Alternate Duotone Colors. 2 bytes (version = 1), 2 bytes count, following is repeated for each count: [Color: 2 bytes for space followed by 4 * 2 byte color component ], following this is another 2 byte count, usually 256, followed by Lab colors one byte each for L, a, b.This resource is not read or used by Photoshop.'],
	[0x042B, 1067, '(Photoshop CS)Alternate Spot Colors. 2 bytes (version = 1), 2 bytes channel count, following is repeated for each count: 4 bytes channel ID, Color: 2 bytes for space followed by 4 * 2 byte color component.This resource is not read or used by Photoshop.'],
	[0x042D, 1069, '(Photoshop CS2) Layer Selection ID(s). 2 bytes count, following is repeated for each count: 4 bytes layer ID'],
	[0x042E, 1070, '(Photoshop CS2) HDR Toning information'],
	[0x042F, 1071, '(Photoshop CS2) Print info'],
	[0x0430, 1072, '(Photoshop CS2) Layer Group(s) Enabled ID. 1 byte for each layer in the document, repeated by length of the resource.NOTE: Layer groups have start and end markers'],
	[0x0431, 1073, '(Photoshop CS3) Color samplers resource.Also see ID 1038 for old format.See See Color samplers resource format.'],
	[0x0432, 1074, '(Photoshop CS3) Measurement Scale. 4 bytes (descriptor version = 16), Descriptor(see See Descriptor structure)'],
	[0x0433, 1075, '(Photoshop CS3) Timeline Information. 4 bytes (descriptor version = 16), Descriptor(see See Descriptor structure)'],
	[0x0434, 1076, '(Photoshop CS3) Sheet Disclosure. 4 bytes (descriptor version = 16), Descriptor(see See Descriptor structure)'],
	[0x0435, 1077, '(Photoshop CS3) DisplayInfo structure to support floating point clors.Also see ID 1007. See Appendix A in Photoshop API Guide.pdf .'],
	[0x0436, 1078, '(Photoshop CS3) Onion Skins. 4 bytes (descriptor version = 16), Descriptor(see See Descriptor structure)'],
	[0x0438, 1080, '(Photoshop CS4) Count Information. 4 bytes (descriptor version = 16), Descriptor(see See Descriptor structure) Information about the count in the document.See the Count Tool.'],
	[0x043A, 1082, '(Photoshop CS5) Print Information. 4 bytes (descriptor version = 16), Descriptor(see See Descriptor structure) Information about the current print settings in the document.The color management options.'],
	[0x043B, 1083, '(Photoshop CS5) Print Style. 4 bytes (descriptor version = 16), Descriptor(see See Descriptor structure) Information about the current print style in the document.The printing marks, labels, ornaments, etc.'],
	[0x043C, 1084, '(Photoshop CS5) Macintosh NSPrintInfo.Variable OS specific info for Macintosh.NSPrintInfo.It is recommened that you do not interpret or use this data.'],
	[0x043D, 1085, '(Photoshop CS5) Windows DEVMODE.Variable OS specific info for Windows.DEVMODE.It is recommened that you do not interpret or use this data.'],
	[0x043E, 1086, '(Photoshop CS6) Auto Save File Path. Unicode string. It is recommened that you do not interpret or use this data.'],
	[0x043F, 1087, '(Photoshop CS6) Auto Save Format. Unicode string. It is recommened that you do not interpret or use this data.'],
	[0x0440, 1088, '(Photoshop CC) Path Selection State. 4 bytes (descriptor version = 16), Descriptor(see See Descriptor structure) Information about the current path selection state.'],
	// [0x07D0 - 0x0BB6, 2000 - 2997, 'Path Information (saved paths).See See Path resource format.'],
	[0x0BB7, 2999, 'Name of clipping path.See See Path resource format.'],
	[0x0BB8, 3000, '(Photoshop CC) Origin Path Info. 4 bytes (descriptor version = 16), Descriptor(see See Descriptor structure) Information about the origin path data.'],
	// [0x0FA0 - 0x1387, 4000 - 4999, 'Plug - In resource(s).Resources added by a plug-in. See the plug-in API found in the SDK documentation'],
	[0x1B58, 7000, 'Image Ready variables.XML representation of variables definition'],
	[0x1B59, 7001, 'Image Ready data sets'],
	[0x1F40, 8000, '(Photoshop CS3) Lightroom workflow, if present the document is in the middle of a Lightroom workflow.'],
	[0x2710, 10000, 'Print flags information. 2 bytes version ( = 1), 1 byte center crop marks, 1 byte ( = 0), 4 bytes bleed width value, 2 bytes bleed width scale.'],
];

/* istanbul ignore next */
export function getImageResourceName(id: number) {
	for (let r of imageResources) {
		if (r[1] === id)
			return r[2];
	}

	return 'Invalid image Resource';
}

export interface ResourceHandler {
	key: number;
	has: (target: ImageResources) => boolean;
	read: (reader: PsdReader, target: ImageResources, left: () => number) => void;
	write: (writer: PsdWriter, target: ImageResources) => void;
}

let handlers: ResourceHandler[] = [];
let handlersMap: { [key: number]: ResourceHandler } = {};

function addHandler(handler: ResourceHandler) {
	handlers.push(handler);
	handlersMap[handler.key] = handler;
}

export function getHandler(key: number) {
	return handlersMap[key];
}

export function getHandlers() {
	return handlers;
}

addHandler({
	key: 1006,
	has: target => typeof target.alphaChannelNames !== 'undefined',
	read: (reader, target, left) => {
		target.alphaChannelNames = [];

		if (left())
			target.alphaChannelNames.push(reader.readPascalString(1));
	},
	write: (writer, target) => {
		for (let name of target.alphaChannelNames)
			writer.writePascalString(name);
	},
});

addHandler({
	key: 1024,
	has: target => typeof target.layerState !== 'undefined',
	read: (reader, target) => {
		target.layerState = reader.readUint16();
	},
	write: (writer, target) => {
		writer.writeUint16(target.layerState);
	},
});

addHandler({
	key: 1026,
	has: target => typeof target.layersGroup !== 'undefined',
	read: (reader, target, left) => {
		target.layersGroup = [];

		while (left())
			target.layersGroup.push(reader.readUint16());
	},
	write: (writer, target) => {
		for (let g of target.layersGroup)
			writer.writeUint32(g);
	},
});

addHandler({
	key: 1037,
	has: target => typeof target.globalAngle !== 'undefined',
	read: (reader, target) => {
		target.globalAngle = reader.readUint32();
	},
	write: (writer, target) => {
		writer.writeUint32(target.globalAngle);
	},
});

addHandler({
	key: 1045,
	has: target => typeof target.unicodeAlphaNames !== 'undefined',
	read: (reader, target, left) => {
		target.unicodeAlphaNames = [];

		while (left())
			target.unicodeAlphaNames.push(reader.readUnicodeString());
	},
	write: (writer, target) => {
		for (let name of target.unicodeAlphaNames)
			writer.writeUnicodeString(name);
	},
});

addHandler({
	key: 1049,
	has: target => typeof target.globalAltitude !== 'undefined',
	read: (reader, target) => {
		target.globalAltitude = reader.readUint32();
	},
	write: (writer, target) => {
		writer.writeUint32(target.globalAltitude);
	},
});

addHandler({
	key: 1053,
	has: target => typeof target.alphaIdentifiers !== 'undefined',
	read: (reader, target) => {
		let count = reader.readUint32();
		target.alphaIdentifiers = [];

		while (count--)
			target.alphaIdentifiers.push(reader.readUint32());
	},
	write: (writer, target) => {
		writer.writeUint32(target.alphaIdentifiers.length);

		for (let id of target.alphaIdentifiers)
			writer.writeUint32(id);
	},
});

addHandler({
	key: 1054,
	has: target => typeof target.urlsList !== 'undefined',
	read: (reader, target) => {
		let count = reader.readUint32();
		target.urlsList = [];

		if (count)
			throw new Error('Not implemented: URL List');
	},
	write: (writer, target) => {
		writer.writeUint32(target.urlsList.length);

		if (target.urlsList.length)
			throw new Error('Not implemented: URL List');
	},
});

addHandler({
	key: 1057,
	has: target => typeof target.versionInfo !== 'undefined',
	read: (reader, target) => {
		target.versionInfo = {
			version: reader.readUint32(),
			hasRealMergedData: !!reader.readUint8(),
			writerName: reader.readUnicodeString(),
			readerName: reader.readUnicodeString(),
			fileVersion: reader.readUint32(),
		};
	},
	write: (writer, target) => {
		writer.writeUint32(target.versionInfo.version);
		writer.writeUint8(target.versionInfo.hasRealMergedData ? 1 : 0);
		writer.writeUnicodeString(target.versionInfo.writerName);
		writer.writeUnicodeString(target.versionInfo.readerName);
		writer.writeUint32(target.versionInfo.fileVersion);
	},
});

addHandler({
	key: 1064,
	has: target => typeof target.pixelAspectRatio !== 'undefined',
	read: (reader, target) => {
		target.pixelAspectRatio = {
			version: reader.readUint32(),
			aspect: reader.readFloat64(),
		};
	},
	write: (writer, target) => {
		writer.writeUint32(target.pixelAspectRatio.version);
		writer.writeFloat64(target.pixelAspectRatio.aspect);
	},
});

addHandler({
	key: 1069,
	has: target => typeof target.layerSelectionIds !== 'undefined',
	read: (reader, target) => {
		let count = reader.readUint16();
		target.layerSelectionIds = [];

		while (count--)
			target.layerSelectionIds.push(reader.readUint32());
	},
	write: (writer, target) => {
		writer.writeUint16(target.layerSelectionIds.length);

		for (let id of target.layerSelectionIds)
			writer.writeUint32(id);
	},
});

addHandler({
	key: 1072,
	has: target => typeof target.layerGroupsEnabledId !== 'undefined',
	read: (reader, target, left) => {
		target.layerGroupsEnabledId = [];

		while (left())
			target.layerGroupsEnabledId.push(reader.readUint8());
	},
	write: (writer, target) => {
		for (let id of target.layerGroupsEnabledId)
			writer.writeUint8(id);
	},
});

//private writeThumbnailResource(thumb: HTMLCanvasElement) {
// this.writeSignature('8BIM');
// this.writeUint16(1036); // resource ID
// this.writeUint16(0); // name (pascal string)
// this.section(2,() => { // size
//     this.writeUint32(0); // format (1 = kJpegRGB; 0 = kRawRGB)
//     this.writeUint32(thumb.width); // width
//     this.writeUint32(thumb.height); // height
//     // Widthbytes: Padded row bytes = (width * bits per pixel + 31) / 32 * 4
//     this.writeUint32((((thumb.width * 8 * 4 + 31) / 32) | 0) * 4);
//     var compressedSizeOffset = writer.getOffset();
//     this.writeUint32(0); // size after compression
//     this.writeUint16(24); // bits per pixel
//     this.writeUint16(1); // number of planes
//     // TODO: actual JFIF thumbnail data here
//     
//     let array = new Uint8Array(thumbData);
//     
//     for (let i = 0; i < array.length; i++)
//         this.writeUint8(array[i]);
// });
//}
