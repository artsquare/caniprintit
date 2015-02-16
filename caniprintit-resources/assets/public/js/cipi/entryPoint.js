define(['jquery', 'bacon', 'bacon.jquery', 'printanalyzer/findBestAR', 'printanalyzer/AspectRatio',
    'vow', 'filereader/getImageDimensions', 'cipi/selectSizes', 'view/showView', 'cipi/mobileCheck', 'cipi/keenImage'],
    function($, Bacon, bjq, findBestAR, AspectRatio, vow, getImageDimensions, selectSizes, view, isMobile, keenImage) {

    function formatCrop(crop) {
        return (undefined === crop || isNaN(crop)) ? '--' : (crop * 100).toFixed(1) + "%";
    }

    $(document).ready(function() {
        var keenObj = {};
        $('.faq').click(function() {
            $('.content').hide();
            $('#faq').fadeIn();
        });
        $('#faq').click(function() {
            $('.content').show();
            $('#faq').fadeOut();
        });

        // form field Models and their values mapped as integers
        var widthField = bjq.textFieldValue($('#widthInput'), "");
        var width = widthField.changes().map(parseInt).debounce(300).skipDuplicates();

        var heightField = bjq.textFieldValue($('#heightInput'), "");
        var height = heightField.changes().map(parseInt).debounce(300).skipDuplicates();

        // update the dimensions atomically when setting from a file input
        var dimensions = Bacon.combineTemplate({ width: width, height: height }).debounce(10);
        dimensions.onValue(function(val) {
            keenObj.height = val.height;
            keenObj.width = val.width;
        });
        var inputFile = $('#fileInput').changeE().map('.target.files.0');
        inputFile.onValue(function(val) {
            keenObj.imageType = val.type.replace(/^image\//, '');
            keenObj.fileSize = val.size;
        });
        // stream to reset the filename field on manual entry
        var nameReset = Bacon.mergeAll(
                $('#widthInput').focusinE(),
                $('#heightInput').focusinE()).
            map("manual size");

        Bacon.mergeAll(inputFile.map('.name'), nameReset).
            assign($('#filename'), 'text');

        // property that represents the latest set of dimensions extracted from the file
        var fileDimensions = inputFile.map(getImageDimensions).flatMapLatest(Bacon.fromPromise);
        // update the form whenever a new image gets analyzed
        widthField.addSource(fileDimensions.map(".width"));
        heightField.addSource(fileDimensions.map(".height"));

        // this would probably be done best with mapping to errors, but I couldn't get the
        // selectSizes call to stop firing with stale data
        var bestAR = dimensions.map(function(dim) { return findBestAR(dim.width, dim.height); });
        bestAR.onValue(function(ar) {
            if(ar === null) {
                view.showBadImageError();
            }
            keenObj.aspectRatio = ar.ratio.label;
            if ($('#filename').text() !== 'manual size') {
                keenImage(keenObj.width, keenObj.height, keenObj.imageType, keenObj.fileSize, keenObj.aspectRatio, window.clientIp, isMobile(), navigator.userAgent);
            }
        });

        bestAR.map('.difference').map(formatCrop).assign($('#cropAmount'), 'text');

        // I don't like this but am not sure that there's a cleaner way to do a combine.
        var sizes = Bacon.combineWith(function(ar, dimensions) {
                return ar ? ar.findSizes(dimensions, 130, 150) : null;
            }, bestAR.map('.ratio'), dimensions).filter(bestAR);

        sizes.map(selectSizes, 3).log().onValue(view.showSizes);
    });
});