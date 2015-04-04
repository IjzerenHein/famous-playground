/**
 * Main application view.
 */
define(function(require) {

	// import dependencies
	var View = require('famous/core/View');
	var Surface = require('famous/core/Surface');
	var HeaderFooterLayout = require('famous/views/HeaderFooterLayout');
	var FlexScrollView = require('famous-flex/FlexScrollView');

	function AppView() {
		View.apply(this, arguments);

		var hf = new HeaderFooterLayout({
			headerSize: 40,
			footerSize: 40
		});
		this.add(hf);
		hf.header.add(new Surface({
			classes: ['surface', 'blue'],
			content: '<div>Header</div>'
		}));
		hf.footer.add(new Surface({
			classes: ['surface', 'red'],
			content: '<div>Footer</div>'
		}));

		/**
		 * ScrollView delegate.
		 */
		var minHeaderHeight = 40;
		var maxHeaderHeight = 200;
		var leadingScrollViewDelegate = {

			/**
			 * Called by the FlexScrollView to ask whether and how far the
			 * the leading scrollview can be scrolled in delta direction.
			 */
			canScroll: function(delta) {
				//console.log('canScroll: ' + delta);
				if (delta < 0) {
					return Math.max(minHeaderHeight - hf.options.headerSize, delta);
				}
				else {
					return Math.min(maxHeaderHeight - hf.options.headerSize, delta);
				}
			},

			/**
			 * Called by the FlexScrollView when someone starts scrolling, and informs
			 * the leading view that the leading view should be scrolled by x pixels.
			 */
			applyScrollForce: function(delta) {
				//console.log('applyScrollForce: ' + delta);
				hf.setOptions({
					headerSize: Math.max(Math.min(hf.options.headerSize + delta, maxHeaderHeight), minHeaderHeight)
				});
			},

			/**
			 * Called by the FlexScrollView while someone is scrolling, and informs
			 * the leading view that the leading view should be scrolled by x pixels.
			 */
			updateScrollForce: function(oldDelta, newDelta) {
				var delta = (newDelta - oldDelta);
				//console.log('updateScrollForce: ' + delta);
				hf.setOptions({
					headerSize: Math.max(Math.min(hf.options.headerSize + delta, maxHeaderHeight), minHeaderHeight)
				});
			},

			/**
			 * Called by the FlexScrollView when someone stops scrolling (releases finger or mouse),
			 * and informs the leading view of the final delta and release velocity.
			 */
			releaseScrollForce: function(delta, velocity) {
				//console.log('releaseScrollForce: ' + delta + ', velocity: ' + velocity);
			}
		};

		var scrollView = new FlexScrollView({
			leadingScrollView: leadingScrollViewDelegate,
			useContainer: true,
			mouseMove: true,
			overscroll: false
		});
		hf.content.add(scrollView);
		for (var i = 0; i < 50; i++) {
			scrollView.push(new Surface({
				classes: ['surface', 'green'],
				size: [undefined, 50],
				content: '<div>Surface</div>'
			}));
			scrollView.push(new Surface({
				classes: ['surface', 'yellow'],
				size: [undefined, 50],
				content: '<div>Surface</div>'
			}));
		}
	}
	AppView.prototype = Object.create(View.prototype);
	AppView.prototype.constructor = AppView;

	return AppView;
});
