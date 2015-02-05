define(['jquery', 'view/printSizeView'], function($, printSize) {
    
    function createDomNodes (sizes) {
        for (var i in sizes) {
            var size = sizes[i];            
            var domNode = printSize(size.quality, size.inches, size.dpi);
            $("#result-div-" + i).html(domNode);
        }
    }
    return {
        showSizes: function(sizes) {
            $('.width').text($('#widthInput').val());
            $('.height').text($('#heightInput').val());
            $('.flash-title').removeClass('hidden');
            $('.template').fadeIn();
            $('.template-modal').fadeIn();
            $('.badImageError').fadeOut();
            for(var i = 0; i < 3; i++) {
                $("#result-div-" + i).empty();
            }
            createDomNodes(sizes);
        },
        showBadImageError: function() {
            $('.loader').hide();
            $('.badImageError').fadeIn();
        }
    };
});