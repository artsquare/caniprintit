define(['printanalyzer/dataTable', 'printanalyzer/AspectRatio'], function(dataTable, AspectRatio) {
    'use strict';

    var MAX_VARIANCE = 0.05;

    return function(dimension1, dimension2) {
        var targetRatio = AspectRatio.calculate(dimension1, dimension2);

        var bestRatio = null;
        var bestDifference = MAX_VARIANCE;

        dataTable.RATIOS.forEach(function(candidate) {
            var candidateDifference = Math.abs(candidate.differenceFactor(targetRatio));
            if(candidateDifference < bestDifference) {
                bestRatio = candidate;
                bestDifference = candidateDifference;
            }
        });

        if(bestRatio === null) {
            return null;
        } else {
            return { ratio: bestRatio, difference: bestDifference };
        }
    };
});