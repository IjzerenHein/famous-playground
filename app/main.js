/**
 * This is the main entry point for the web-app.
 *
 * Add any global initialisation like FastClick, wait for cordova
 * load event, and such to this main file.
 */
define(function(require) {

	// import dependencies
	require('./index.html');
	require('famous-polyfills');
	require('famous/core/famous.css');
	require('./assets/favicon.ico');
	require('styles/styles.less');
	var ViewSequence = require('famous/core/ViewSequence');
	var Surface = require('famous/core/Surface');

	function log(viewSequence) {
		var idx = 0;
		var node = viewSequence.get();
		while (node) {
			console.log(idx + ': ' + node.content);
			idx++;
			viewSequence = viewSequence.getNext();
			node = viewSequence ? viewSequence.get() : undefined;
		}
	}

	var viewSequence = new ViewSequence();
	viewSequence.splice(0, 0, new Surface({content: 'surface 1'}));
	viewSequence.splice(1, 0, new Surface({content: 'surface 2'}));
	viewSequence.push(new Surface({content: 'surface 3'}));
	log(viewSequence);
});
