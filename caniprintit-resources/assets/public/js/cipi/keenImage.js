define(['cipi/keenConfig'], function(keenClient) {
    'use strict';

    return function(width, height, imageType, fileSize, clientIp, isMobile, userAgent) {
        keenClient.addEvent(window.keenCollection, {
            width: width,
            height: height,
            imageType: imageType,
            fileSize: fileSize,
            ip: clientIp,
            mobile: isMobile,
            userAgent: userAgent
        });
    };
});