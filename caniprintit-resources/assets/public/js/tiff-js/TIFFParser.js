/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/* This file has been included from the tiff-js project. It has been wrapped as an AMD module,
 * commented-out debugging lines are removed, it's reindented, and the actual rendering section
 * from parseTIFF has been eliminated in favor of immediately returning height and width information
 * (since trying to manually render very large TIFFs will screw up most browser heaps).
 */

define([], function () {

    "use strict";

    function TIFFParser() {
        this.tiffDataView = undefined;
        this.littleEndian = undefined;
        this.fileDirectories = [];
    };

    TIFFParser.prototype = {
        isLittleEndian: function () {
            // Get byte order mark.
            var BOM = this.getBytes(2, 0);

            // Find out the endianness.
            if (BOM === 0x4949) {
                this.littleEndian = true;
            } else if (BOM === 0x4D4D) {
                this.littleEndian = false;
            } else {
                console.log(BOM);
                throw TypeError("Invalid byte order value.");
            }

            return this.littleEndian;
        },

        hasTowel: function () {
            // Check for towel.
            if (this.getBytes(2, 2) !== 42) {
                throw RangeError("You forgot your towel!");
                return false;
            }

            return true;
        },

        getFieldTagName: function (fieldTag) {
            // See: http://www.digitizationguidelines.gov/guidelines/TIFF_Metadata_Final.pdf
            // See: http://www.digitalpreservation.gov/formats/content/tiff_tags.shtml
            var fieldTagNames = {
                // TIFF Baseline
                0x013B: 'Artist',
                0x0102: 'BitsPerSample',
                0x0109: 'CellLength',
                0x0108: 'CellWidth',
                0x0140: 'ColorMap',
                0x0103: 'Compression',
                0x8298: 'Copyright',
                0x0132: 'DateTime',
                0x0152: 'ExtraSamples',
                0x010A: 'FillOrder',
                0x0121: 'FreeByteCounts',
                0x0120: 'FreeOffsets',
                0x0123: 'GrayResponseCurve',
                0x0122: 'GrayResponseUnit',
                0x013C: 'HostComputer',
                0x010E: 'ImageDescription',
                0x0101: 'ImageLength',
                0x0100: 'ImageWidth',
                0x010F: 'Make',
                0x0119: 'MaxSampleValue',
                0x0118: 'MinSampleValue',
                0x0110: 'Model',
                0x00FE: 'NewSubfileType',
                0x0112: 'Orientation',
                0x0106: 'PhotometricInterpretation',
                0x011C: 'PlanarConfiguration',
                0x0128: 'ResolutionUnit',
                0x0116: 'RowsPerStrip',
                0x0115: 'SamplesPerPixel',
                0x0131: 'Software',
                0x0117: 'StripByteCounts',
                0x0111: 'StripOffsets',
                0x00FF: 'SubfileType',
                0x0107: 'Threshholding',
                0x011A: 'XResolution',
                0x011B: 'YResolution',

                // TIFF Extended
                0x0146: 'BadFaxLines',
                0x0147: 'CleanFaxData',
                0x0157: 'ClipPath',
                0x0148: 'ConsecutiveBadFaxLines',
                0x01B1: 'Decode',
                0x01B2: 'DefaultImageColor',
                0x010D: 'DocumentName',
                0x0150: 'DotRange',
                0x0141: 'HalftoneHints',
                0x015A: 'Indexed',
                0x015B: 'JPEGTables',
                0x011D: 'PageName',
                0x0129: 'PageNumber',
                0x013D: 'Predictor',
                0x013F: 'PrimaryChromaticities',
                0x0214: 'ReferenceBlackWhite',
                0x0153: 'SampleFormat',
                0x022F: 'StripRowCounts',
                0x014A: 'SubIFDs',
                0x0124: 'T4Options',
                0x0125: 'T6Options',
                0x0145: 'TileByteCounts',
                0x0143: 'TileLength',
                0x0144: 'TileOffsets',
                0x0142: 'TileWidth',
                0x012D: 'TransferFunction',
                0x013E: 'WhitePoint',
                0x0158: 'XClipPathUnits',
                0x011E: 'XPosition',
                0x0211: 'YCbCrCoefficients',
                0x0213: 'YCbCrPositioning',
                0x0212: 'YCbCrSubSampling',
                0x0159: 'YClipPathUnits',
                0x011F: 'YPosition',

                // EXIF
                0x9202: 'ApertureValue',
                0xA001: 'ColorSpace',
                0x9004: 'DateTimeDigitized',
                0x9003: 'DateTimeOriginal',
                0x8769: 'Exif IFD',
                0x9000: 'ExifVersion',
                0x829A: 'ExposureTime',
                0xA300: 'FileSource',
                0x9209: 'Flash',
                0xA000: 'FlashpixVersion',
                0x829D: 'FNumber',
                0xA420: 'ImageUniqueID',
                0x9208: 'LightSource',
                0x927C: 'MakerNote',
                0x9201: 'ShutterSpeedValue',
                0x9286: 'UserComment',

                // IPTC
                0x83BB: 'IPTC',

                // ICC
                0x8773: 'ICC Profile',

                // XMP
                0x02BC: 'XMP',

                // GDAL
                0xA480: 'GDAL_METADATA',
                0xA481: 'GDAL_NODATA',

                // Photoshop
                0x8649: 'Photoshop',
            };

            var fieldTagName;

            if (fieldTag in fieldTagNames) {
                fieldTagName = fieldTagNames[fieldTag];
            } else {
                console.log("Unknown Field Tag:", fieldTag);
                fieldTagName = "Tag" + fieldTag;
            }

            return fieldTagName;
        },

        getFieldTypeName: function (fieldType) {
            var fieldTypeNames = {
                0x0001: 'BYTE',
                0x0002: 'ASCII',
                0x0003: 'SHORT',
                0x0004: 'LONG',
                0x0005: 'RATIONAL',
                0x0006: 'SBYTE',
                0x0007: 'UNDEFINED',
                0x0008: 'SSHORT',
                0x0009: 'SLONG',
                0x000A: 'SRATIONAL',
                0x000B: 'FLOAT',
                0x000C: 'DOUBLE',
            };

            var fieldTypeName;

            if (fieldType in fieldTypeNames) {
                fieldTypeName = fieldTypeNames[fieldType];
            }

            return fieldTypeName;
        },

        getFieldTypeLength: function (fieldTypeName) {
            var fieldTypeLength;

            if (['BYTE', 'ASCII', 'SBYTE', 'UNDEFINED'].indexOf(fieldTypeName) !== -1) {
                fieldTypeLength = 1;
            } else if (['SHORT', 'SSHORT'].indexOf(fieldTypeName) !== -1) {
                fieldTypeLength = 2;
            } else if (['LONG', 'SLONG', 'FLOAT'].indexOf(fieldTypeName) !== -1) {
                fieldTypeLength = 4;
            } else if (['RATIONAL', 'SRATIONAL', 'DOUBLE'].indexOf(fieldTypeName) !== -1) {
                fieldTypeLength = 8;
            }

            return fieldTypeLength;
        },

        getBits: function (numBits, byteOffset, bitOffset) {
            bitOffset = bitOffset || 0;
            var extraBytes = Math.floor(bitOffset / 8);
            var newByteOffset = byteOffset + extraBytes;
            var totalBits = bitOffset + numBits;
            var shiftRight = 32 - numBits;

            if (totalBits <= 0) {
                console.log(numBits, byteOffset, bitOffset);
                throw RangeError("No bits requested");
            } else if (totalBits <= 8) {
                var shiftLeft = 24 + bitOffset;
                var rawBits = this.tiffDataView.getUint8(newByteOffset, this.littleEndian);
            } else if (totalBits <= 16) {
                var shiftLeft = 16 + bitOffset;
                var rawBits = this.tiffDataView.getUint16(newByteOffset, this.littleEndian);
            } else if (totalBits <= 32) {
                var shiftLeft = bitOffset;
                var rawBits = this.tiffDataView.getUint32(newByteOffset, this.littleEndian);
            } else {
                console.log(numBits, byteOffset, bitOffset);
                throw RangeError("Too many bits requested");
            }

            var chunkInfo = {
                'bits': ((rawBits << shiftLeft) >>> shiftRight),
                'byteOffset': newByteOffset + Math.floor(totalBits / 8),
                'bitOffset': totalBits % 8,
            };

            return chunkInfo;
        },

        getBytes: function (numBytes, offset) {
            if (numBytes <= 0) {
                console.log(numBytes, offset);
                throw RangeError("No bytes requested");
            } else if (numBytes <= 1) {
                return this.tiffDataView.getUint8(offset, this.littleEndian);
            } else if (numBytes <= 2) {
                return this.tiffDataView.getUint16(offset, this.littleEndian);
            } else if (numBytes <= 3) {
                return this.tiffDataView.getUint32(offset, this.littleEndian) >>> 8;
            } else if (numBytes <= 4) {
                return this.tiffDataView.getUint32(offset, this.littleEndian);
            } else {
                console.log(numBytes, offset);
                throw RangeError("Too many bytes requested");
            }
        },

        getFieldValues: function (fieldTagName, fieldTypeName, typeCount, valueOffset) {
            var fieldValues = [];

            var fieldTypeLength = this.getFieldTypeLength(fieldTypeName);
            var fieldValueSize = fieldTypeLength * typeCount;

            if (fieldValueSize <= 4) {
                // The value is stored at the big end of the valueOffset.
                if (this.littleEndian === false) {
                    var value = valueOffset >>> ((4 - fieldTypeLength) * 8);
                } else {
                    var value = valueOffset;
                }

                fieldValues.push(value);
            } else {
                for (var i = 0; i < typeCount; i++) {
                    var indexOffset = fieldTypeLength * i;

                    if (fieldTypeLength >= 8) {
                        if (['RATIONAL', 'SRATIONAL'].indexOf(fieldTypeName) !== -1) {
                            // Numerator
                            fieldValues.push(this.getBytes(4, valueOffset + indexOffset));
                            // Denominator
                            fieldValues.push(this.getBytes(4, valueOffset + indexOffset + 4));
                        } else {
                            console.log(fieldTypeName, typeCount, fieldValueSize);
                            throw TypeError("Can't handle this field type or size");
                        }
                    } else {
                        fieldValues.push(this.getBytes(fieldTypeLength, valueOffset + indexOffset));
                    }
                }
            }

            if (fieldTypeName === 'ASCII') {
                fieldValues.forEach(function (e, i, a) {
                    a[i] = String.fromCharCode(e);
                });
            }

            return fieldValues;
        },

        clampColorSample: function (colorSample, bitsPerSample) {
            var multiplier = Math.pow(2, 8 - bitsPerSample);

            return Math.floor((colorSample * multiplier) + (multiplier - 1));
        },

        makeRGBAFillValue: function (r, g, b, a) {
            if (typeof a === 'undefined') {
                a = 1.0;
            }
            return "rgba(" + r + ", " + g + ", " + b + ", " + a + ")";
        },

        parseFileDirectory: function (byteOffset) {
            var numDirEntries = this.getBytes(2, byteOffset);

            var tiffFields = [];

            for (var i = byteOffset + 2, entryCount = 0; entryCount < numDirEntries; i += 12, entryCount++) {
                var fieldTag = this.getBytes(2, i);
                var fieldType = this.getBytes(2, i + 2);
                var typeCount = this.getBytes(4, i + 4);
                var valueOffset = this.getBytes(4, i + 8);

                var fieldTagName = this.getFieldTagName(fieldTag);
                var fieldTypeName = this.getFieldTypeName(fieldType);

                var fieldValues = this.getFieldValues(fieldTagName, fieldTypeName, typeCount, valueOffset);

                tiffFields[fieldTagName] = {
                    'type': fieldTypeName,
                    'values': fieldValues
                };
            }

            this.fileDirectories.push(tiffFields);

            var nextIFDByteOffset = this.getBytes(4, i);

            if (nextIFDByteOffset === 0x00000000) {
                return this.fileDirectories;
            } else {
                return this.parseFileDirectory(nextIFDByteOffset);
            }
        },

        parseTIFF: function (tiffArrayBuffer) {
            this.tiffDataView = new DataView(tiffArrayBuffer);

            this.littleEndian = this.isLittleEndian(this.tiffDataView);

            if (!this.hasTowel(this.tiffDataView, this.littleEndian)) {
                return;
            }

            var firstIFDByteOffset = this.getBytes(4, 4);

            this.fileDirectories = this.parseFileDirectory(firstIFDByteOffset);

            var fileDirectory = this.fileDirectories[0];

            console.log(fileDirectory);

            var imageWidth = fileDirectory.ImageWidth.values[0];
            var imageLength = fileDirectory.ImageLength.values[0];

            return { width: imageWidth, height: imageLength };
        },
    }

    return TIFFParser;
});