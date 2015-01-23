define(['jquery', 'filereader/fileController'], function($, reader) {
	$(document).ready(function() {
		reader.bindListeners();
	});	
});