;(function  ($) {
	$.tools = function  (el,opts) {
		var $tools = $(el);
		$tools.methods = {
			opts:{
				device:['768','992','1200']
			},
			init:function  () {
				$tools.methods.run();
			},
			run:function  () {
				try{var o = {f:'left'};new $tools.marquee($('[data-action=marquee]'),o)}catch(e){console.log('catch');};
			}
		}

		$tools.marquee = function  (el,opts) {
			this.el = $(el);
			this.float
		}

		return $tools;
	}
})(jQuery);

var $tools = null;
$(function  () {
	$tools = new $.tools();
	$tools.methods.init();
})