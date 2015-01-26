define(['jquery', 'bacon', 'bacon.jquery'], function($, bacon, bjq) {	
	$(document).ready(function() {
		var width = $('#widthInput').asEventStream('keyup').map(function(e) {
			return parseInt($(e.target).val());
		});
		var height = $('#heightInput').asEventStream('keyup').map(function(e) {
			return parseInt($(e.target).val());
		});
		var both = bacon.combineAsArray(width, height);
		both.onValue(function(val) {
			console.log(val)
		})
	});
});