/**
 * Loads an image from a JavaScript File object and returns a promise yielding the dimensions
 * as 'height' and 'width'. We are not currently attempting to display a thumbnail of the image.
 */
define(['vow', 'tiff'], function(vow, TIFFParser) {
    'use strict';

    function readNative(blob, resolve, reject) {
        var reader = new FileReader();

        reader.onload = function(e) {
            var img = new Image();

            img.onload = function(e) {
                resolve(img);
            };

            img.onerror = function(e) {
                reject("Problem loading image: " + e);
            };

            img.src = e.target.result;
        };

        reader.onerror = function(e) {
            reject("Problem reading file: " + e.message);
        };

        reader.readAsDataURL(blob);
    }

    function readTiff(blob, resolve, reject) {
        var reader = new FileReader();

        reader.onload = function(e) {
            var parser = new Tiff({buffer: e.target.result})
            resolve({ width: parser.width(), height: parser.height() });
        };

        reader.onerror = function(e) {
            reject("Problem reading file: " + e.message);
        };

        reader.readAsArrayBuffer(blob);
    }

    return function(blob) {
        return new vow.Promise(function(resolve, reject) {
            if('image/' !== blob.type.substring(0, 6)) {
                reject("The file is not an image file.");
            }

            (('image/tiff' === blob.type) ? readTiff : readNative)(blob, resolve, reject);
        });
    };
});