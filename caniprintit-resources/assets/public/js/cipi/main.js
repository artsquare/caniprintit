define(['jquery', 'bacon', 'bacon.jquery', 'printanalyzer/findBestAR', 'printanalyzer/AspectRatio', 'vow'], function($, bacon, bjq, findBestAR, AspectRatio, vow) {	
	$(document).ready(function() {

		//reading from form changes
		var width = bjq.textFieldValue($('#widthInput')).changes().map(function(e) {
			return parseInt(e)
		});
		var height = bjq.textFieldValue($('#heightInput')).changes().map(function(e) {
			return parseInt(e);
		})
		
		var both = bacon.combineAsArray(width, height);
		both.onValue(function(val) {
			return new vow.Promise(function(resolve, reject){
				if (val[0] > 0 && val[1] > 0) {
					resolve(findBestAR(val[0], val[1]));
				} else {
					reject(new Error("Bad response" + this.status));
				}
			}).then(function(AR) {
				if (AR) {
					return AR.ratio.findSizes({width: val[0], height: val[1]}, 130, 150);
				} else {
					console.log("Bad dimensions");
				}
			}).then(function(sizes) {
				console.log(sizes);
			});
		});
	});
});