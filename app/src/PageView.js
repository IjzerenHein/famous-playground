define(function(require, exports, module) {


var View = require('famous/core/View');
var Surface = require('famous/core/Surface');
var Transform = require('famous/core/Transform');
var StateModifier = require('famous/modifiers/StateModifier');
var HeaderFooter = require('famous/views/HeaderFooterLayout');
var ImageSurface = require('famous/surfaces/ImageSurface');
var ViewSequence = require('famous/core/ViewSequence');

var ScrollerController = require('../../node_modules/famous-flex/src/ScrollController');
var FlexScrollView = require('../../node_modules/famous-flex/src/FlexScrollView');
var Scrollview          = require("famous/views/Scrollview");
var FastClick = require('fastclick/lib/fastclick');
//var FastClick = require('famous/inputs/FastClick');
var ContainerSurface = require('famous/surfaces/ContainerSurface');

function PageView() {
    View.apply(this, arguments);
    _createLayout.call(this);
    _createHeader.call(this);
    _initScrollView.call(this);
    _setListeners.call(this);
}

PageView.prototype = Object.create(View.prototype);
PageView.prototype.constructor = PageView;

PageView.DEFAULT_OPTIONS = {
    headerSize: 44
};


function _initScrollView(){

	function getRandomColor() {
		var letters = '0123456789ABCDEF'.split('');
		var color = '#';
		for (var i = 0; i < 6; i++ ) {
			color += letters[Math.floor(Math.random() * 16)];
		}
		return color;
	}

// Commented famous-flex code to try with original famous ScrollView

	this.scrollView = new FlexScrollView({
			layoutOptions: {
				margins: [15, 15, 15, 15],
				spacing: 1
			},
			flow: true,
			alignment: 1,
			mouseMove: true,
			debug: true,
			useContainer: false,
			container: { // options passed to the ContainerSurface
				properties: {
					//overflow: 'hidden',
					backgroundColor: 'black'
					//boxShadow: '0 0 20px rgba(0,0,0,0.5)'
				}
			}
		});

    var viewSequence = new ViewSequence();

    for(var i=0; i< 100; i++){
        var background = new Surface({
            content: '<h1>' + i + '</h1>',
            size: [undefined, 200],
            properties: {
            	backgroundColor: getRandomColor(),
            	color: "#fAAf0f"
            }
        });
        viewSequence.push(background);
        //background.pipe(this._eventOutput);
        background.pipe(this.scrollView);
    }

    this.scrollView.setDataSource(viewSequence);
    this.layout.content.add(this.scrollView);

		/*var scrollview = new Scrollview();
    var views = [];
    scrollview.sequenceFrom(views);

    for(var i=0; i< 100; i++){

        var background = new Surface({
            content: '<h1>' + i + '</h1>',
            size: [undefined, 200],
            properties: {
            	backgroundColor: getRandomColor(),
            	color: "#fAAf0f"
            }
        });
        views.push(background);
     //   background.pipe(this._eventOutput);
        //background.pipe(scrollview);
    }

    var containerSurface = new ContainerSurface({
    	properties: {
    		overflow: 'hidden'
    	}
    });
    containerSurface.add(scrollview);
    this.layout.content.add(containerSurface);
    containerSurface.pipe(scrollview);
    //this.layout.content.add(scrollview);
    */
}


function _setListeners() {

	this.menuSurface.on('click', function(e) {
		this._eventOutput.emit('menuToggle');
	}.bind(this));
}



function _createLayout() {
    this.layout = new HeaderFooter({
        headerSize: this.options.headerSize
    });

    var layoutModifier = new StateModifier({
        transform: Transform.translate(0, 0, 0.1)
    });

    this.add(layoutModifier).add(this.layout);
}

function _createHeader() {
    var backgroundSurface = new Surface({
        properties: {
            backgroundColor: 'black'
        }
    });

    var backgroundModifier = new StateModifier({
        transform: Transform.behind
    });

    this.layout.header.add(backgroundModifier).add(backgroundSurface);

    this.menuSurface = new ImageSurface({
        size: [44, 44],
        content: require('assets/img/menu.png')
    });

    var searchSurface = new ImageSurface({
        size: [232, 44],
        content: require('assets/img/search.png')
    });

    var iconSurface = new ImageSurface({
        size: [44, 44],
        content: require('assets/img/icon.png')
    });

    var menuModifier = new StateModifier({
        origin: [0, 0.5],
        align: [0, 0.5]
    });

    var searchModifier = new StateModifier({
        origin: [0.5, 0.5],
        align: [0.5, 0.5]
    });

    var iconModifier = new StateModifier({
        origin: [1, 0.5],
        align: [1, 0.5]
    });

    this.layout.header.add(menuModifier).add(this.menuSurface);
    this.layout.header.add(searchModifier).add(searchSurface);
    this.layout.header.add(iconModifier).add(iconSurface);

}

module.exports = PageView;

});
