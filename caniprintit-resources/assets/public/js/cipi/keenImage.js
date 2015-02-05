define(['cipi/keenConfig'], function(keenClient) {
    'use strict';

    return function(width, height, imageType, isMobile, userAgent) {
        keenClient.addEvent("imageMetaData", {
            width: width,
            height: height,
            imageType: imageType,
            isMobile: isMobile,
            userAgent: userAgent
        });
    };
});