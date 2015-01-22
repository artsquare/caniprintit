define(['printanalyzer/DPI'], function(DPI) {
    'use strict';

    function AspectRatio(label, ratio, sizes) {
        this.label = label;
        this.ratio = ratio;
        this.sizes = sizes;
    }

    AspectRatio.prototype.toString = function() {
        return "AspectRatio[" + this.label + ", " + this.ratio.toFixed(3) + "]";
    };

    AspectRatio.prototype.differenceFactor = function(from) {
        var fromRatio = (from instanceof AspectRatio) ? from.ratio : from;
        return (fromRatio - this.ratio) / this.ratio;
    };

    AspectRatio.prototype.findSizes = function(dimensions, okayDpi, goodDpi) {
        var longSide = Math.max(dimensions.width, dimensions.height);
        var shortSide = Math.min(dimensions.width, dimensions.height);

        var sizes = {};
        sizes[DPI.GOOD] = [];
        sizes[DPI.OKAY] = [];
        sizes[DPI.BAD]  = [];

        // the image will have to be cropped, so take the lower of the sides' DPIs
        this.sizes.forEach(function(size) {
            var minDpi = Math.min(longSide / size[0], shortSide / size[1]);
            if(minDpi >= goodDpi) {
                sizes[DPI.GOOD].push(size);
            } else if (minDpi >= okayDpi) {
                sizes[DPI.OKAY].push(size);
            } else {
                sizes[DPI.BAD].push(size);
            }
        });

        return sizes;
    };

    AspectRatio.calculate = function(width, height) {
        if(width > height) {
            return width / height;
        } else {
            return height / width;
        }
    };

    return AspectRatio;
});