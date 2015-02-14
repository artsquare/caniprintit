define(['cipi/keenConfig'], function(keenClient) {
    'use strict';

    return function(width, height, imageType, fileSize, aspectRatio, clientIp, isMobile, userAgent) {
        keenClient.addEvent(window.keenCollection, {
            width: width,
            height: height,
            imageType: imageType,
            fileSize: fileSize,
            aspectRatio: aspectRatio,
            ip: clientIp,
            mobile: isMobile,
            userAgent: userAgent
        });
    };
});