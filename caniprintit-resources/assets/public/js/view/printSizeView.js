define([], function() {
	return function(quality, size, dpi) {
		if (quality === 'good') {
			return '<div class="good"><h1>' + size[1] + '" x ' + size[0] + '"' + '</h1><p>DPI: ' + dpi.toFixed(0) + '</p><div class="icon-success"><img src="https://s3-us-west-2.amazonaws.com/asq-tmp-dev/Check.svg" width="45px"></div></div>';
		} else if (quality === 'okay') {
			return '<div class="okay"><h1>' + size[1] + '" x ' + size[0] + '"' + '</h1><p>DPI: ' + dpi.toFixed(0) + '</p><div class="icon-okay"><img src="https://s3-us-west-2.amazonaws.com/asq-tmp-dev/Check.svg" width="45px"></div></div>';
		} else {
			return '<div class="bad"><h1>' + size[1] + '" x ' + size[0] + '"' + '</h1><p>DPI: ' + dpi.toFixed(0) + '</p><div class="icon-failure"><img src="https://s3-us-west-2.amazonaws.com/asq-tmp-dev/Exclamation.svg" width="13px"></div></div>';
       }
	};
});