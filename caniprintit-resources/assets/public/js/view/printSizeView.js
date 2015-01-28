define([], function() {
	return function(quality, size, dpi) {
		if (quality === 'good') {
			return '<div class="good"><h1>' + size[1] + '" x ' + size[0] + '"' + '</h1><p>DPI: ' + dpi.toFixed(0) + '</p><div class="icon-success"><i class="fa fa-check"></i></div></div>';
		} else if (quality === 'okay') {
			return '<div class="okay"><h1>' + size[1] + '" x ' + size[0] + '"' + '</h1><p>DPI: ' + dpi.toFixed(0) + '</p><div class="icon-okay"><i class="fa fa-check"></i></div></div>';
		} else {
			return '<div class="bad"><h1>' + size[1] + '" x ' + size[0] + '"' + '</h1><p>DPI: ' + dpi.toFixed(0) + '</p><div class="icon-failure"><i class="fa fa-exclamation"></i></div></div>';
       }
	};
});