define(['printanalyzer/AspectRatio'], function(AspectRatio) {
    'use strict';

    return {
        RATIOS: [
            new AspectRatio("square", 1,     [[12, 12], [14, 14], [16, 16], [18, 18], [20, 20], [24, 24], [30, 30], [36, 36], [40, 40]]),
            new AspectRatio("5:6",    6/5,   [[12, 10], [24, 20], [36, 30]]),
            new AspectRatio("4:5",    5/4,   [[10, 8],  [20, 16], [30, 24]]),
            new AspectRatio("11:14",  14/11, [[14, 11], [28, 22], [42, 33]]),
            new AspectRatio("7:9",    9/7,   [[18, 14], [27, 21], [36, 28]]),
            new AspectRatio("3:4",    4/3,   [[12, 9],  [16, 12], [25, 15], [24, 18], [40, 30]]),
            new AspectRatio("2:3",    3/2,   [[12, 8],  [18, 12], [20, 16], [30, 20], [36, 24]]),
            new AspectRatio("11:17",  17/11, [[17, 11], [34, 22]]),
            new AspectRatio("2:1",    2,     [[20, 10], [24, 12], [30, 15], [40, 20]])
        ]
    };
});