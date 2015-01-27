define(['jquery', 'view/printSizeView'], function($, printSize) {
	
	function createDomNodes (sizes) {
		for (var i in sizes) {
			var size = sizes[i];
			var domNode = printSize(size.quality, size.inches, size.dpi)
			$("#" + i).html(domNode)
		}
	}
	return {
		showSizes: function(sizes) {
			createDomNodes(sizes);
			$('.template').show();
		},
		showBadImageError: function() {

		}
	}
});