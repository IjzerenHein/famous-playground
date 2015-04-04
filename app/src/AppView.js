/**
 * Main application view.
 */
define(function(require) {

	// import dependencies
	var View = require('famous/core/View');
	var Modifier = require('famous/core/Modifier');
	var Surface = require('famous/core/Surface');
	var InputSurface = require('famous/surfaces/InputSurface');
	var Transform = require('famous/core/Transform');
	var SequentialLayout = require('famous/views/SequentialLayout');
	var Timer = require('famous/utilities/Timer');

	function AppView() {
		View.apply(this, arguments);

		var sl = new SequentialLayout();
		var surface = new Surface({
				size: [200, 100],
				classes: ['content'],
				content: '<div>Initial content</div>'
		});
		this.add(new Modifier({
			transform: Transform.translate(20, 70, 0)
		})).add(sl);
		sl.sequenceFrom([surface]);

		function _show() {
			sl.sequenceFrom([surface]);
		}

		function _hide() {
			sl.sequenceFrom([]);
		}

		var showBtn = new Surface({
				size: [100, 40],
				content: '<div>Show</div>',
				classes: ['btn']
		});
		this.add(new Modifier({
			transform: Transform.translate(20, 20, 0)
		})).add(showBtn);
		showBtn.on('click', _show);

		var hideBtn = new Surface({
				size: [100, 40],
				content: '<div>Hide</div>',
				classes: ['btn']
		});
		this.add(new Modifier({
			transform: Transform.translate(140, 20, 0)
		})).add(hideBtn);
		hideBtn.on('click', _hide);

		var contentInput = new InputSurface({
				size: [100, 40],
				value: 'new content',
				classes: ['input'],
				placeholder: 'content...'
		});
		this.add(new Modifier({
			transform: Transform.translate(380, 20, 0)
		})).add(contentInput);

		var setContentBtn = new Surface({
				size: [100, 40],
				content: '<div>setContent</div>',
				classes: ['btn']
		});
		this.add(new Modifier({
			transform: Transform.translate(260, 20, 0)
		})).add(setContentBtn);
		setContentBtn.on('click', function() {
			surface.setContent('<div>' + contentInput.getValue() + '</div>');
		});

		var setContentAndHideBtn = new Surface({
				size: [360, 40],
				content: '<div>Trigger bug: Set Content, Hide and show after 2 secs</div>',
				classes: ['btn']
		});
		this.add(new Modifier({
			transform: Transform.translate(20, 180, 0)
		})).add(setContentAndHideBtn);
		setContentAndHideBtn.on('click', function() {

			/**
			 * BUG
			 *
			 * when content is set and the renderable is recalled the next render-cycle,
			 * content that was set, is ignored.
			 */
			surface.setContent('<div>' + contentInput.getValue() + '</div>');
			_hide();
			Timer.setTimeout(function() {
				_show();
			}, 2000);
		});

		var description = new Surface({
				size: [360, 40],
				content: '<div>When the surface is re-shown after 2 seconds, the content should have changed to the value of the right-top content input, but it hasn\'t</div>',
				classes: ['desc']
		});
		this.add(new Modifier({
			transform: Transform.translate(20, 230, 0)
		})).add(description);
	}
	AppView.prototype = Object.create(View.prototype);
	AppView.prototype.constructor = AppView;

	return AppView;
});
