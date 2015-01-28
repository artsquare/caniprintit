define(['jquery', 'bacon', 'bacon.jquery', 'printanalyzer/findBestAR', 'printanalyzer/AspectRatio',
    'vow', 'filereader/getImageDimensions', 'cipi/selectSizes', 'view/showView'],
    function($, bacon, bjq, findBestAR, AspectRatio, vow, getImageDimensions, selectSizes, view) {

    $(document).ready(function() {
        function getImageSizes(val) {
            return new vow.Promise(function(resolve, reject){
                if (val[0] > 0 && val[1] > 0) {
                    resolve(findBestAR(val[0], val[1]));
                } else {
                    reject(new Error("The dimensions [" + val[0] + ", " + val[1] + "] must be positive."));
                }
            }).then(function(bestAspectRatio) {
                if (bestAspectRatio) {
                    return bestAspectRatio.ratio.findSizes({width: val[0], height: val[1]}, 130, 150);
                } else {
                    view.showBadImageError();
                }
            }).then(function(sizes) {
                view.showSizes(selectSizes(3, sizes));
            });
        }

        //reading from form changes
        var width = bjq.textFieldValue($('#widthInput')).changes().map(parseInt);
        var height = bjq.textFieldValue($('#heightInput')).changes().map(parseInt);
        
        var both = bacon.combineAsArray(width, height);
        both.onValue(function(val) {
            $('#filename').text('--');
            getImageSizes(val);
        });

        // filling in form values from file input change
        function fillInForm(width, height) {
            $('#widthInput').val(width);
            $('#heightInput').val(height);
            var input = $("input[type=file]").val().split('\\')[2];
            $('#filename').text(input);
            both = bacon.combineAsArray(width, height);
            both.onValue(function(val) {
                getImageSizes(val);
            });
        }

        var input = $("input[type=file]").asEventStream('change').map(function(e) {
            view.showLoader();
            return getImageDimensions(e.target.files[0]);
        });
        
        input.onValue(function(val) {
            val.then(function(dimensions) {
                fillInForm(dimensions.width, dimensions.height);
            });
        });
    });
});