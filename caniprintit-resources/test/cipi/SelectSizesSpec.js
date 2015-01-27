define(['printanalyzer/DPI', 'cipi/selectSizes'], function(DPI, selectSizes) {
    'use strict';

    var ALL_SIZES = {};
    ALL_SIZES[DPI.GOOD] = [
        {dpi: 2000/10, inches: [10,    8]},
        {dpi: 2000/15, inches: [15,   12]}
    ];

    ALL_SIZES[DPI.OKAY] = [
        {dpi: 2000/20, inches: [20,   16]},
        {dpi: 2000/24, inches: [24, 19.2]}
    ];

    ALL_SIZES[DPI.BAD] = [
        {dpi: 2000/30, inches: [30,   24]},
        {dpi: 2000/45, inches: [45,   36]}
    ];

    describe("selectSizes", function() {
        it("selects 3 properly with a full set of options", function() {
            var selected = selectSizes(3, ALL_SIZES);
            expect(selected.length).toEqual(3);
            expect(selected[0].inches).toEqual([15, 12]);
            expect(selected[1].inches).toEqual([24, 19.2]);
            expect(selected[2].inches).toEqual([30, 24]);
        });

        it("selects 4 properly with a full set of options", function() {
            var selected = selectSizes(4, ALL_SIZES);
            expect(selected.length).toEqual(4);
            expect(selected[0].inches).toEqual([15, 12]);
            expect(selected[1].inches).toEqual([24, 19.2]);
            expect(selected[2].inches).toEqual([30, 24]);
            expect(selected[3].inches).toEqual([45, 36]);
        });

        it("selects 5 properly with a full set of options", function() {
            var selected = selectSizes(5, ALL_SIZES);
            expect(selected.length).toEqual(5);
            expect(selected[0].inches).toEqual([10, 8]);
            expect(selected[1].inches).toEqual([15, 12]);
            expect(selected[2].inches).toEqual([24, 19.2]);
            expect(selected[3].inches).toEqual([30, 24]);
            expect(selected[4].inches).toEqual([45, 36]);
        });

        it("selects 6 properly with a full set of options", function() {
            var selected = selectSizes(6, ALL_SIZES);
            expect(selected.length).toEqual(6);
            expect(selected[0].inches).toEqual([10, 8]);
            expect(selected[1].inches).toEqual([15, 12]);
            expect(selected[2].inches).toEqual([20, 16]);
            expect(selected[3].inches).toEqual([24, 19.2]);
            expect(selected[4].inches).toEqual([30, 24]);
            expect(selected[5].inches).toEqual([45, 36]);
        });

        it("selects properly with 6/7 options", function() {
            var selected = selectSizes(7, ALL_SIZES);
            expect(selected.length).toEqual(6);
            expect(selected[0].inches).toEqual([10, 8]);
            expect(selected[1].inches).toEqual([15, 12]);
            expect(selected[2].inches).toEqual([20, 16]);
            expect(selected[3].inches).toEqual([24, 19.2]);
            expect(selected[4].inches).toEqual([30, 24]);
            expect(selected[5].inches).toEqual([45, 36]);
        });
    });
});