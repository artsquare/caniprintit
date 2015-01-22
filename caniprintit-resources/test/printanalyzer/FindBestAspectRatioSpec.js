define (['printanalyzer/findBestAR'], function (findBestAR) {
    describe("finder function", function() {

        it("returns null if we can't find a good match", function() {
            expect(findBestAR(22, 10)).toBeNull();
            expect(findBestAR(1.416666666, 1)).toBeNull();
        });

        it("matches down from just above", function() {
            var best = findBestAR(1005, 800);
            expect(best.ratio.ratio).toEqual(1.25);
            expect(best.difference).toBeCloseTo(0.005, 12);
        });

        it("matches up from just below", function() {
            var best = findBestAR(800, 998);
            expect(best.ratio.ratio).toEqual(1.25);
            expect(best.difference).toBeCloseTo(0.002, 12);
        });
    });
});