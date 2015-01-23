define(['printanalyzer/findBestAR', 'view/main'], function(findBestAR, view) {
	'use strict';

	return {
		reader: new FileReader(),
		readFile: function(file) {
			this.reader.readAsDataURL(file);
			this.reader.onload = function(e) {
				var img = new Image();
				img.src = e.target.result;
				img.onload = function() {
					var aspectRatio = findBestAR(img.width, img.height);
					// aspectRatio === null ? view.showBadImageView() : view.hello();
					// this.findBestPrintSize(aspectRatio)
				};
			};
		},
		readTiffFile: function(file) {
			this.reader.readAsArrayBuffer(file);
			this.reader.onload = function(e) {
				var tiffy = new Tiff({buffer: e.target.result});
				return { width: tiffy.width(), height: tiffy.height() };
			};
		}
	};
});	