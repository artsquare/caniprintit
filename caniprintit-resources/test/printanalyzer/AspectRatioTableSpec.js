'use strict';

define (['printanalyzer/dataTable'], function (dataTable) {
    describe("aspect ratio table", function() {
        it("starts with 1.0", function() {
            expect(dataTable.RATIOS[0].ratio).toEqual(1.0);
        });

        it("is in order", function() {
            var widest = 0.999;
            dataTable.RATIOS.forEach(function(entry) {
                expect(entry.ratio).toBeGreaterThan(widest);
                widest = entry.ratio;
            });
        });
    });
});
