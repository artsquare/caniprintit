define([], function() {
    var TEMPLATE = Object.freeze({
        good: {
            message: "This image is large enough to be printed at this size.",
            iconGlyph: "check"
        },
        okay: {
            message: "This image may or may not be large enough to be printed at this size.",
            iconGlyph: "exclamation"
        },
        bad:  {
            message: "This image is not large enough to be printed at this size.",
            iconGlyph: "times"
        }
    });

	return function(quality, size, dpi) {
        return '<div class="' + quality + '">' +
            '<h1>' + size[0] + '" x ' + size[1] + '"</h1>' + 
            '<p>DPI: ' + dpi.toFixed(0) + '</p>' + 
            '<div class="quality-description"><p>' + TEMPLATE[quality].message + '</p></div>' + 
            '<div class="icon-' + quality + '"><i class="fa fa-' + TEMPLATE[quality].iconGlyph + '"></i></div>'
            + '</div>';
    };
});