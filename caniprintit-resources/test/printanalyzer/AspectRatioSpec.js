'use strict';

define (['printanalyzer/AspectRatio', 'printanalyzer/DPI'], function (AspectRatio, DPI) {
    var ONE = new AspectRatio("one", 1.0, [[1,1], [3,3], [5,5], [100, 100]]);
    var TWO = new AspectRatio("two", 2.0, [[2,1], [4,2]]);

    var TWO_BY_THREE = new AspectRatio("2x3", 3/2);
    var THREE_BY_FOUR = new AspectRatio("3x4", 4/3);

    describe("aspect ratio difference", function() {
        it("is zero when equal", function() {
            expect(ONE.differenceFactor(ONE)).toEqual(0.0);
        });

        it("is positive when from is wider", function() {
            expect(ONE.differenceFactor(TWO)).toEqual(1.0);
        })

        it("is negative when from is narrower", function() {
            expect(TWO.differenceFactor(ONE)).toEqual(-0.5);
        });

        it("works with AspectRatios", function() {
            expect(TWO.differenceFactor(ONE)).toEqual(-0.5);
        });

        it("works with Numbers", function() {
            expect(TWO.differenceFactor(1.0)).toEqual(-0.5);
        });

        it("matches when closely above", function() {
            var tbtDF = TWO_BY_THREE.differenceFactor(1.51);
            expect(tbtDF).toBeGreaterThan(0.0);
            expect(tbtDF).toBeLessThan(0.01);
        });

        it("matches when closely below", function() {
            var tbfDF = THREE_BY_FOUR.differenceFactor(1.33);
            expect(tbfDF).toBeLessThan(0.0);
            expect(tbfDF).toBeGreaterThan(-0.003);
        });
    });

    describe("finding print sizes", function() {
        it("works for square", function() {
            var dimensions = {width: 400, height: 400};
            var sizes = ONE.findSizes(dimensions, 100, 200);
            expect(sizes[DPI.GOOD].length).toEqual(1);
            expect(sizes[DPI.GOOD][0]).toEqual({dpi: 400, inches: [1,1]});

            expect(sizes[DPI.OKAY].length).toEqual(1);
            expect(sizes[DPI.BAD].length).toEqual(2);
        });

        it("works for almost square", function() {
            var dimensions = {width: 420, height: 400};
            var sizes = ONE.findSizes(dimensions, 100, 300);
            expect(sizes[DPI.GOOD].length).toEqual(1);
            expect(sizes[DPI.GOOD][0]).toEqual({dpi: 400, inches: [1,1]});

            expect(sizes[DPI.OKAY].length).toEqual(1);
            expect(sizes[DPI.BAD].length).toEqual(2);
        });

        it("works when the crop breaks the DPI limit", function() {
            var dimensions = {width: 401, height: 199};
            var sizes = TWO.findSizes(dimensions, 100, 200);
            expect(sizes[DPI.GOOD].length).toEqual(0);
            expect(sizes[DPI.OKAY].length).toEqual(1);
            expect(sizes[DPI.BAD].length).toEqual(1);

            dimensions = {width: 399, height: 201};
            sizes = TWO.findSizes(dimensions, 100, 200);
            expect(sizes[DPI.GOOD].length).toEqual(0);
            expect(sizes[DPI.OKAY].length).toEqual(1);
            expect(sizes[DPI.BAD].length).toEqual(1);
        });
    });

    describe("static calculate function", function() {
        it("works when wide", function() {
            expect(AspectRatio.calculate(3, 2)).toEqual(1.5);
        });

        it("works when tall", function() {
            expect(AspectRatio.calculate(4, 5)).toEqual(1.25);
        });
    });
});