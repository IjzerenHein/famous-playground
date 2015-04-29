define(function(require, exports, module) {

	var View = require('famous/core/View');
	var Surface = require('famous/core/Surface');
	var Transform = require('famous/core/Transform');
	var StateModifier = require('famous/modifiers/StateModifier');
	var PageView = require('./PageView');
	var Easing = require('famous/transitions/Easing');
	var MenuView = require('./MenuView');
	var StripData = require('../data/StripData');

	var GenericSync = require('famous/inputs/GenericSync');
	var MouseSync = require('famous/inputs/MouseSync');
	var TouchSync = require('famous/inputs/TouchSync');
//	var ScrollSync = require('famous/inputs/ScrollSync');
    var Transitionable = require('famous/transitions/Transitionable');
    var Modifier = require('famous/core/Modifier');
//    var facebookConnectPlugin = require('facebookConnectPlugin');
	GenericSync.register({'mouse': MouseSync, 'touch': TouchSync});



	function AppView() {
		View.apply(this, arguments);
		
//		facebookConnectPlugin.login(Array strings of permissions, Function success, Function failure)

		this.menuToggle = false;
        this.pageViewPos = new Transitionable(0);

		this._createPageView();
		this._createMenuView();

		this._setListeners();
		this._handleSwipe();
	}

	document.addEventListener('deviceready', function() {
		var x = 0;
		x = x+1 ;
		alert(dir(facebookConnectPlugin));
	})

	AppView.prototype = Object.create(View.prototype);
	AppView.prototype.constructor = AppView;

    AppView.DEFAULT_OPTIONS = {
        openPosition: 276,
        transition: {
            duration: 300,
            curve: 'easeOut'
        },
        posThreshold: 138,
        velThreshold: 0.75
    };

	module.exports = AppView;


	AppView.prototype._createPageView = function() {
			this.pageView = new PageView();
			this.pageModifier = new Modifier({
				transform: function() {
					return Transform.translate(this.pageViewPos.get(), 0, 0);
				}.bind(this)
			});

			this.add(this.pageModifier).add(this.pageView);
		};

	AppView.prototype._setListeners = function() {
		this.pageView.on('menuToggle', this.toggleMenu.bind(this));
	};

	AppView.prototype.toggleMenu = function() {

		if(this.menuToggle) {
			this.slideLeft();
		} else {
			this.slideRight();
            this.menuView.animateStrips();
		}
	};

   AppView.prototype.slideLeft = function() {
        this.pageViewPos.set(0, this.options.transition, function() {
            this.menuToggle = false;
        }.bind(this));
    };

    AppView.prototype.slideRight = function() {
        this.pageViewPos.set(this.options.openPosition, this.options.transition, function() {
            this.menuToggle = true;
        }.bind(this));
    };


	AppView.prototype._createMenuView = function() {
		this.menuView = new MenuView({ stripData: StripData });

		var menuModifier = new StateModifier({
			transform: Transform.behind
		});

		this.add(menuModifier).add(this.menuView);
	};

	AppView.prototype._handleSwipe = function() {
		var sync = new GenericSync(
			['mouse', 'touch'],
			{
				direction: GenericSync.DIRECTION_X,
				rails: true
			}
		);

		this.pageView.pipe(sync);

        sync.on('update', function(data) {
            var currentPosition = this.pageViewPos.get();
            console.log(data);
            if(currentPosition === 0 && data.velocity > 0) {
                this.menuView.animateStrips();
            }
	    	this.pageViewPos.set(Math.max(0, currentPosition + data.delta));
        }.bind(this));

        sync.on('end', function(data) {
            var velocity = data.velocity;
            var position = this.pageViewPos.get();

            if(position > this.options.posThreshold) {
                if(velocity < -this.options.velThreshold) {
                    this.slideLeft();
                } else {
                    this.slideRight();
                }
            } else {
                if(velocity > this.options.velThreshold) {
                    this.slideRight();
                } else {
                    this.slideLeft();
                }
            }
        }.bind(this));

	};
});
