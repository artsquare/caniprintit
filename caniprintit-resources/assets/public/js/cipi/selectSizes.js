/**
  * Defines a single function that expects the output from AspectRatio#sizes()
  * and selects the number requested using the following algorithm:
  *
  * - Try to pick the largest GOOD size and the largest OKAY size.
  * - Fill remaining slots with the smallest BAD sizes.
  * - Fill any remaining slots with the largest GOOD sizes.
  * - Fill any remaining slots with the largest OKAY sizes.
  */
define(['printanalyzer/AspectRatio', 'printanalyzer/DPI'], function(AspectRatio, DPI) {
    function pushIfPresent(array, quality, size) {
        if(size) {
            array.push({
                quality: quality,
                dpi: size.dpi,
                inches: size.inches
            });
        }
    }

    function compareDpiDesc(a, b) {
        return b.dpi - a.dpi;
    }

    return function(numberOfResults, arSizes) {
        var displaySizes = [];
        var mySizes = JSON.parse(JSON.stringify(arSizes));

        function drain(quality, operation) {
            while(displaySizes.length < numberOfResults && mySizes[quality].length > 0) {
                pushIfPresent(displaySizes, quality, mySizes[quality][operation]());
            }
        }

        // First, try to get the best GOOD and OKAY.
        pushIfPresent(displaySizes, DPI.GOOD, mySizes[DPI.GOOD].pop());
        pushIfPresent(displaySizes, DPI.OKAY, mySizes[DPI.OKAY].pop());

        // Fill up any remaining spaces with BAD entries.
        drain(DPI.BAD, 'shift');

        // If we don't have any more BAD, try to fill up with GOOD entries.
        // Great (or at least large) image!
        drain(DPI.GOOD, 'pop');

        // Last resort.
        drain(DPI.OKAY, 'pop');

        return displaySizes.sort(compareDpiDesc);
    };
});