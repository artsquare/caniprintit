define(['filereader/readFile'], function(reader) {
	'use strict';
	
	return {
		bindListeners: function() {
			$("input[type=file]").change(function(e) {
				var file = e.target.files[0];
				if (file.type === "image/tiff") {
					reader.readTiffFile(file);
				} else {
					reader.readFile(file);
				}
			}.bind(this));
		}
	};
});