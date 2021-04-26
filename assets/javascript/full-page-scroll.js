/**
 * Full page
 */
(function () {
	'use strict';


	var frameNumber = 0, // start video at frame 0
	    // lower numbers = faster playback
	    playbackConst = 2000,
	    // get page height from video duration
	    setHeight = document.getElementById("set-height"),
	    // select video element
	    vid = document.getElementById('v0');


			// vid.addEventListener('play', function() {
			// 	setHeight.style.height = Math.floor(vid.duration) * playbackConst + "px";
			// 	console.log('Current time: ' + this.currentTime);
			// });



	/**
	 * Full scroll main function
	 */
	var fullScroll = function (params) {
		/**
		 * Main div
		 * @type {Object}
		 */
		var main = document.getElementById(params.mainElement);

		/**
		 * Sections divclass
		 * @type {Array}
		 */
		var sections = main.getElementsByTagName('section');

		/**
		 * Full page scroll configurations
		 * @type {Object}
		 */
		var defaults = {
			container : main,
			sections : sections,
			animateTime : params.animateTime || 0.7,
			animateFunction : params.animateFunction || 'ease',
			maxPosition: sections.length - 1,
			currentPosition: 0,
			// displayDots: typeof params.displayDots != 'undefined' ? params.displayDots : true,
			dotsPosition: params.dotsPosition || 'left'
		};

		this.defaults = defaults;
		/**
		 * Init build
		 */
		this.init();
	};





	/**
	 * Init plugin
	 */
	fullScroll.prototype.init = function () {
		this.buildPublicFunctions()
			.buildSections()
			// .buildDots()
			.addEvents();

		var anchor = location.hash.replace('#', '').split('/')[0];
		this.changeCurrentPosition(anchor);
		this.registerIeTags();

	};

	/**
	 * Build sections
	 * @return {Object} this(fullScroll)
	 */
	fullScroll.prototype.buildSections = function () {
		var sections = this.defaults.sections;
		for (var i = 0; i < sections.length; i++) {
			sections[i].setAttribute('data-index', i);
		}
		return this;
	};

	/**
	 // * Build dots navigation
	 // * @return {Object} this (fullScroll)
	 */
	// fullScroll.prototype.buildDots = function () {
	// 	this.ul = document.createElement('ul');
	//
	//
	// 	this.ul.className = this.updateClass(1, 'dots', this.ul.className);
	// 	this.ul.className = this.updateClass(1, this.defaults.dotsPosition == 'right' ? 'dots-right' : 'dots-left', this.ul.className);
	//
	// 	var _self = this;
	// 	var sections = this.defaults.sections;
	//
	// 	for (var i = 0; i < sections.length; i++) {
	// 		var li = document.createElement('li');
	// 		var a = document.createElement('a');
	//
	// 		a.setAttribute('href', '#' + i);
	// 		li.appendChild(a);
	// 		_self.ul.appendChild(li);
	// 	}
	//
	// 	this.ul.childNodes[0].firstChild.className = this.updateClass(1, 'active', this.ul.childNodes[0].firstChild.className);
	//
	// 	if (this.defaults.displayDots) {
	// 		document.body.appendChild(this.ul);
	// 	}
	//
	// 	return this;
	// };

	/**
	 * Add Events
	 * @return {Object} this(fullScroll)
	 */
	fullScroll.prototype.addEvents = function () {

		if (document.addEventListener) {
			document.addEventListener('mousewheel', this.mouseWheelAndKey, false);
			document.addEventListener('wheel', this.mouseWheelAndKey, false);
			document.addEventListener('keyup', this.mouseWheelAndKey, false);
			document.addEventListener('touchstart', this.touchStart, false);
			document.addEventListener('touchend', this.touchEnd, false);
			window.addEventListener("hashchange", this.hashChange, false);


			/**
			 * Enable scroll if decive don't have touch support
			 */
			if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
				if(!('ontouchstart' in window)){
					document.body.style = "overflow: scroll;";
					document.documentElement.style = "overflow: scroll;";
				}
			}

		} else {
			document.attachEvent('onmousewheel', this.mouseWheelAndKey, false);
			document.attachEvent('onkeyup', this.mouseWheelAndKey, false);
		}

		return this;
	};


	/**
	 * Build public functions
	 * @return {[type]} [description]
	 */
	fullScroll.prototype.buildPublicFunctions = function () {
		var mTouchStart = 0;
		var mTouchEnd = 0;
		var _self = this;

		this.mouseWheelAndKey = function (event) {
			if (event.deltaY > 0 || event.keyCode == 40) {
				_self.defaults.currentPosition ++;
				_self.changeCurrentPosition(_self.defaults.currentPosition);
			} else if (event.deltaY < 0 || event.keyCode == 38) {
				_self.defaults.currentPosition --;
				_self.changeCurrentPosition(_self.defaults.currentPosition);
			}
			_self.removeEvents();
		};

		this.touchStart = function (event) {
			mTouchStart = parseInt(event.changedTouches[0].clientY);
			mTouchEnd = 0;
		};

		this.touchEnd = function (event) {
			mTouchEnd = parseInt(event.changedTouches[0].clientY);
			if (mTouchEnd - mTouchStart > 100 || mTouchStart - mTouchEnd > 100) {
				if (mTouchEnd > mTouchStart) {
					_self.defaults.currentPosition --;
				} else {
					_self.defaults.currentPosition ++;
				}
				_self.changeCurrentPosition(_self.defaults.currentPosition);
			}
		};

		this.hashChange = function (event) {
			if (location) {
				var anchor = location.hash.replace('#', '').split('/')[0];
				if (anchor !== "") {
					if (anchor < 0) {
						_self.changeCurrentPosition(0);
					} else if (anchor > _self.defaults.maxPosition) {
						_self.changeCurrentPosition(_self.defaults.maxPosition);
					} else {
						_self.defaults.currentPosition = anchor;
						_self.animateScroll();
					}
				}
			}
		};

		this.removeEvents = function () {
			if (document.addEventListener) {
			document.removeEventListener('mousewheel', this.mouseWheelAndKey, false);
			document.removeEventListener('wheel', this.mouseWheelAndKey, false);
			document.removeEventListener('keyup', this.mouseWheelAndKey, false);
			document.removeEventListener('touchstart', this.touchStart, false);
			document.removeEventListener('touchend', this.touchEnd, false);

			} else {
				document.detachEvent('onmousewheel', this.mouseWheelAndKey, false);
				document.detachEvent('onkeyup', this.mouseWheelAndKey, false);
			}

			setTimeout(function(){
				_self.addEvents();
			}, 600);
		};

		this.animateScroll = function () {

			var animateTime = this.defaults.animateTime;
			var animateFunction = this.defaults.animateFunction;

			var position = this.defaults.currentPosition * 100;

			this.defaults.container.style.webkitTransform = 'translateY(-' + position + '%)';
			this.defaults.container.style.mozTransform = 'translateY(-' + position + '%)';
			this.defaults.container.style.msTransform = 'translateY(-' + position + '%)';
			this.defaults.container.style.transform = 'translateY(-' + position + '%)';
			this.defaults.container.style.webkitTransition = 'all ' + animateTime + 's ' + animateFunction;
			this.defaults.container.style.mozTransition = 'all ' + animateTime + 's ' + animateFunction;
			this.defaults.container.style.msTransition = 'all ' + animateTime + 's ' + animateFunction;
			this.defaults.container.style.transition = 'all ' + animateTime + 's ' + animateFunction;


		};

		this.changeCurrentPosition = function (position) {
			if (position !== "") {
				_self.defaults.currentPosition = position;
				location.hash = _self.defaults.currentPosition;






				let hero1 = document.getElementById('section1');
				


				let about = document.getElementById('section2');
				let projects = document.getElementById('section3');
				let contact = document.getElementById('section4');

				// vid.addEventListener('playing', function() {
				// 	// setHeight.style.height = Math.floor(vid.duration) * playbackConst + "px";
				// 	console.log('Current time: ' + this.currentTime);
				// 	console.log('Video length ' + this.duration)
				// });

				if(position === 0){
					vid.pause();
				}

				if(position === 1){
					vid.play();
					vid.ontimeupdate = function(){
						if(vid.currentTime > 7.0)
						{
							vid.pause();
						}
					};
					about.style.opacity = '0%';
					about.style.backgroundColor= '#1c1e33';
				}

				if(position === 2){

					about.style.transition = '2s';
					about.style.opacity = '100%';
					about.style.backgroundColor= "#1c1e33";
					projects.style.backgroundColor= "#1c1e33";
					vid.currentTime = 0;
					vid.pause();
					init();
				}

				if(position === 3){

					projects.style.backgroundColor= "#7681a3";
					projects.style.transition = '2s';
					about.style.backgroundColor= "#7681a3";
					vid.currentTime = 0;
					vid.pause();
					// init();

				}
				if(position === 4){

					projects.style.backgroundColor= "#7681a3";
					projects.style.transition = '2s';
					about.style.backgroundColor= "#7681a3";
					vid.currentTime = 0;
					vid.pause();
					init();

				}

			}
		};

		this.registerIeTags = function () {
			document.createElement('section');
		};

		this.updateClass = function (type, newClass, currentClass) {
			if (type == 1) {
				return currentClass += ' ' + newClass;
			} else if (type == 2) {
				return currentClass.replace(newClass, '');
			}
		};

		return this;
	};
	// window.requestAnimationFrame(scrollPlay(position));
	window.fullScroll = fullScroll;
})();
