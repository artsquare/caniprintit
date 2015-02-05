define([], function() {
    'use strict';

    return function(width, height, imageName, isMobile, userAgent) {
        keenClient.addEvent("imageMetaData", {
            width: width,
            height: height,
            imageName: imageName,
            isMobile: isMobile,
            userAgent: userAgent
        });
    }
});