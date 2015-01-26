/**
  * WARNING: PhantomJS is not properly setting the img.src in readNative;
  * this appears to be a FileReader bug with its ancient JS core.
  *
  * These tests should be run manually in Firefox and Chrome.
  */ 
define(['filereader/getImageDimensions', 'vow'], function(getImageDimensions, vow) {
    'use strict';

    function isPhantomJS() {
        return (navigator.userAgent.match("PhantomJS"));
    }

    function urlToBlob(url, mimeType) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.responseType = 'blob';

        return new vow.Promise(function(resolve, reject) {
            xhr.onload = function(e) {
                if(this.status != 200) {
                    reject(new Error("HTTP status was " + this.status))
                }

                if(isPhantomJS()) {
                    var builder = new WebKitBlobBuilder();
                    builder.append(this.response);
                    resolve(builder.getBlob(mimeType));
                } else {
                    resolve(new Blob([this.response], {type: mimeType}));
                }
            }

            xhr.onerror = function(e) {
                reject(e);
            }

            xhr.send();
        });
    }

    function imgToBlob(filename, type) {
        return urlToBlob("/base/test/img/" + filename, "image/" + type);
    }

    var runOnNonPhantom = isPhantomJS() ? xit : it;

    describe("native read handles", function() {
        runOnNonPhantom("a small JPEG", function(done) {
            imgToBlob("monalisa.jpg", "jpeg").
                then(function(blob) {
                    return getImageDimensions(blob);
                }).
                then(function(dimensions) {
                    expect(dimensions.width).toEqual(250);
                    expect(dimensions.height).toEqual(373);
                    done();
                });
        });

        // from http://www.race.u-tokyo.ac.jp/~uchida/blogdata/#viz
        runOnNonPhantom("a large PNG", function(done) {
            imgToBlob("dataset1_community_large.png", "png").
                then(function(blob) {
                    return getImageDimensions(blob);
                }).
                then(function(dimensions) {
                    expect(dimensions.width).toEqual(8000);
                    expect(dimensions.height).toEqual(6000);
                    done();
                });
        });
    });


    describe("TIFF read handles", function(done) {
        // from Oregon Convention Center
        runOnNonPhantom("a medium-sized TIFF", function(done) {
            imgToBlob("occ-pendulum.deflate.tiff", "tiff").
                then(function(blob) {
                    return getImageDimensions(blob);
                }).
                then(function(dimensions) {
                    expect(dimensions.width).toEqual(2234);
                    expect(dimensions.height).toEqual(1500);
                    done();
                });
        });
    })
});