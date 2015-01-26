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

    /**
      * Finds the percentage difference between the provided aspect ratio (either an AspectRatio
      * or a Number), indicating the degree of cropping that would be required to match.
      */
    AspectRatio.prototype.differenceFactor = function(from) {
        var fromRatio = (from instanceof AspectRatio) ? from.ratio : from;
        return (fromRatio - this.ratio) / this.ratio;
    };

    /**
      * Finds the print sizes suitable for the given image dimensions. The argument is expected
      * to have numeric width and height properties. The return value is an object whose keys
      * are the values of the DPI enum and whose values are arrays of entries for each print size,
      * each entry having a numeric DPI value and the dimensions of the print size in inches.
      *
      * This method does not reorder the print sizes to match the orientation of the provided
      * image dimensions.
      * 
      * We'd like to use default arguments for the DPI thresholds, but they are only supported
      * in Firefox as of January 2015.
      */
    AspectRatio.prototype.findSizes = function(dimensions, okayDpi /* = 130*/, goodDpi /* = 150*/) {
        var longSide = Math.max(dimensions.width, dimensions.height);
        var shortSide = Math.min(dimensions.width, dimensions.height);

        var sizes = {};
        sizes[DPI.GOOD] = [];
        sizes[DPI.OKAY] = [];
        sizes[DPI.BAD]  = [];

        // the image will have to be cropped, so take the lower of the sides' DPIs
        this.sizes.forEach(function(size) {
            var minDpi = Math.min(longSide / size[0], shortSide / size[1]);
            var rating;
            if(minDpi >= goodDpi) {
                rating = DPI.GOOD;
            } else if (minDpi >= okayDpi) {
                rating = DPI.OKAY;
            } else {
                rating = DPI.BAD;
            }

            sizes[rating].push({dpi: minDpi, inches: size});
        });

        return sizes;
    };

    /**
      * Class function that calculates a numeric aspect ratio. The result is in the range of 
      * one to infinity and ignores the input orientation.
      */
    AspectRatio.calculate = function(dimension1, dimension2) {
        if(dimension1 < 1 || dimension2 < 1) {
            throw new RangeError("Image dimensions must be positive.");
        }

        return Math.max(dimension1, dimension2) / Math.min(dimension1, dimension2);
    };

    return AspectRatio;
});