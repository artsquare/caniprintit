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
            $('.social').animate({
                'opacity': 1
            });
            for(var i = 0; i < 3; i++) {
                $("#result-div-" + i).empty();
            }
            createDomNodes(sizes);
        },
        showBadImageError: function() {
            console.log("sbie");
            $('.loader').hide();
            $('.template').hide();
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