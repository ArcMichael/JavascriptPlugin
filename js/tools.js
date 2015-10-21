;(function  ($) {
	$.tools = function  (el,options) {
		var $tools = $(el);
		$tools.methods = {
			options:{
				device:['768','992','1200']
			},
			init:function  () {
				$tools.methods.run();
			},
			run:function  () {
				console.log('run');
			}
		}

		$tools.marquee = function  (el,options) {
			this.el = $(el);
		}

		return $tools;
	}
})(jQuery);

var $tools = null;
$(function  () {
	$tools = new $.tools();
	$tools.methods.init();
})