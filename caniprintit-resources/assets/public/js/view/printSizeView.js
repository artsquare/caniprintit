define([], function() {
	return function(quality, size, dpi) {
		if (quality === 'good') {
			return '<div class="good"><div class="quality-description"><p>You can print your image at this size with high-res quality</p></div><h1>' + size[1] + '" x ' + size[0] + '"' + '</h1><p>DPI: ' + dpi.toFixed(0) + '</p><div class="icon-success"><i class="fa fa-check"></i></div></div>';
		} else if (quality === 'okay') {
			return '<div class="okay"><div class="quality-description"><p>You can print your image at this size with medium quality</p></div><h1>' + size[1] + '" x ' + size[0] + '"' + '</h1><p>DPI: ' + dpi.toFixed(0) + '</p><div class="icon-okay"><i class="fa fa-check"></i></div></div>';
		} else {
			return '<div class="bad"><div class="quality-description"><p>You cannot make prints for your image at this size. </p></div><h1>' + size[1] + '" x ' + size[0] + '"' + '</h1><p>DPI: ' + dpi.toFixed(0) + '</p><div class="icon-failure"><i class="fa fa-exclamation"></i></div></div>';
       }
	};
});