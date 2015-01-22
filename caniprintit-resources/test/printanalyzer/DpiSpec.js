'use strict';

define (['printanalyzer/DPI'], function (DPI) {
    describe("DPI", function() {
        it("has GOOD", function() {
            expect(DPI.GOOD).not.toBeNull();
        });

        it("has three entries", function() {
            var count = 0;
            for (var k in DPI) {
                if (DPI.hasOwnProperty(k)) count++;
            }
            expect(count).toEqual(3);
        });
    });
});
