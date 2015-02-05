define(['cipi/keenConfig'], function(client) {
    'use strict';

    return function(width, height, imageName, isMobile, userAgent) {

        client.addEvent("imageMetaData", {
            width: width,
            height: height,
            imageName: imageName,
            isMobile: isMobile,
            userAgent: userAgent
        });
    };
});