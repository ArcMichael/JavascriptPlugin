;(function  ($) {
	$.tools = function  (el,opts) {
		var $tools = $(el);
		$tools.methods = {
			init:function  () {
				$tools.methods.D = $tools.methods.getVendorPrefix();
				$tools.methods.run();
			},
			/**
			 * [getVendorPrefix 辨别浏览器内核]
			 * @return {[type]} 浏览器内核['webkit','khtml','moz','ms','o']
			 */
			getVendorPrefix:function  () {
				var body = document.body||document.documentElement,
				style = body.style,
				vendor = ['webkit','khtml','moz','ms','o'],
				i = 0;

				while(i < vendor.length){
					if (typeof style[vendor[i] + 'Transition'] === 'string') {
						return vendor[i];
					};
					i++;
				}
			},
			run:function  () {
				try{new $tools.marquee($('[data-action=Marquee]'),{isEqual:'false',direction:'left'})}catch(e){console.log('miss function && options is mistake')};
			}
		}
		
		// <div class="exampleMarquee" data-action="Marquee">
		// 	<ul>
		// 		<li>postdicroticteratogenousluxuriantllej</li>
		// 		<li>ducatocrystalloticillate</li>
		// 	</ul>
		// </div>
		/**
		 * [marquee 文字自动轮播]
		 * @param  {[type]} el   [dom]
		 * @param  {[type]} opts [配置参数，不设则使用默认项]
		 * new $tools.marquee($('[data-action=Marquee]'),{
		 * 		isEqual:false,
		 * 		direction:'top'
		 * })
		 */
		$tools.marquee = function  (el,opts) {
			/**
			 * [defaults 参数设置]
			 * @type {isEqual:true||false} 滚动元素长宽是否相等
			 * @type {loop:0} 重复次数，为无限
			 * @type {direction:left} 滚动方向，默认为left [top,right,down,left]
			 * @type {scrollAmount:1} 步长
			 * @type {scrollDelay:20} 时长
			 */
			var defaults = {
				isEqual: opts.isEqual == 'false' || opts.isEqual == false ? false : true,
				loop:opts.loop || 0,
				direction:opts.direction || "left",
				scrollAmount:opts.scrollAmount || 1,
				scrollDelay:opts.scrollDelay || 20,
				scrollSize:null,
				scrollType:null,
				scrollMain:$(el).get(0)
			}

			defaults.$el = $(el);
			defaults.$ul = defaults.$el.children();
			defaults.$li = defaults.$ul.children();
			defaults.scrollType = (defaults.direction == "left" || defaults.direction == "right") ? 1 : 0 ;
			defaults.$ul.css(defaults.scrollType?"width":"height",10000)

			if (defaults.isEqual) {
				defaults.scrollSize = defaults.$li[defaults.scrollType?"outerWidth":"outerHeight"]() * defaults.$li.length;
			}else{
				defaults.$li.each(function  () {
					defaults.scrollSize += $(this)[defaults.scrollType?"outerWidth":"outerHeight"]();
				})
			}

			defaults.$ul.append(defaults.$li.clone()).css(defaults.scrollType?"width":"height", defaults.scrollSize * 2);
			
			$tools.init(defaults);
		}

		$tools.init = function  (opts) {
			var numMoved = 0;
			function scrollFunc (opts) {
				opts.scrollDir = (opts.direction == "left" || opts.direction == "right") ? "scrollLeft" : "scrollTop";
				if (opts.loop > 0) {
					numMoved += opts.scrollAmount;
					if (numMoved > opts.scrollSize * opts.loop) {
						opts.scrollMain[opts.scrollDir] = 0;
						return clearInterval(Move);
					};
				};

				if (opts.direction == "left" || opts.direction == "up") {
					var newPos = opts.scrollMain[opts.scrollDir]+opts.scrollAmount;
					if (newPos >= opts.scrollSize) {
						newPos -= opts.scrollSize
					};
					opts.scrollMain[opts.scrollDir] = newPos;
				}else{
					var newPos = opts.scrollMain[opts.scrollDir]-opts.scrollAmount;
					if (newPos <= 0) {
						newPos += opts.scrollSize;
					};
					opts.scrollMain[opts.scrollDir] = newPos;
				}
			}

			var Move = setInterval(function  () {
				scrollFunc(opts)
			},opts.scrollDelay);

			opts.$el.hover(function() {
				clearInterval(Move);
			}, function() {
				clearInterval(Move);
				Move = setInterval(function  () {
					scrollFunc(opts)
				},opts.scrollDelay);
			});
		}
		return $tools;
	}
})(jQuery);

var $tools = null;
$(function  () {
	$tools = new $.tools();
	$tools.methods.init();
})