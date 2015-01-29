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
            $('.loader').hide();
            $('.template').show();
            $('.badImageError').fadeOut();
            createDomNodes(sizes);
        },
        showBadImageError: function() {
            $('.loader').hide();
            $('.badImageError').fadeIn();
        },
        showLoader: function() {
            var dots = window.setInterval( function() {
                var wait = document.getElementById("wait");
                if ( wait.innerHTML.length > 6 ) 
                    wait.innerHTML = "";
                else 
                    wait.innerHTML += ".";
            }, 200);
            $(".loader").fadeIn();
        }
    };
});