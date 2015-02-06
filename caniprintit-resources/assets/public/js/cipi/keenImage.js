define(['cipi/keenConfig'], function(keenClient) {
    'use strict';

    return function(width, height, imageType, fileSize, isMobile, userAgent) {
        keenClient.addEvent(window.keenCollection, {
            width: width,
            height: height,
            imageType: imageType,
            fileSize: fileSize,
            isMobile: isMobile,
            userAgent: userAgent
        });
    };
});