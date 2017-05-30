//Animate CSS + WayPoints javaScript Plugin
//Example: $(".element").animated("zoomInUp", "zoomOutDown");
//Author URL: http://webdesign-master.ru
(function($) {
		$("aboutMe").fn.animated = function(fadeInLeft, fadeOutRight) {
				$(this).css("opacity", "0").addClass("animated").waypoint(function(dir) {
						if (dir === "down") {
								$(this).removeClass(fadeOutRight).addClass(fadeInLeft).css("opacity", "1");
						} else {
								$(this).removeClass(fadeInLeft).addClass(fadeOutRight).css("opacity", "1");
						};
				}, {
						offset: "80%"
				}).waypoint(function(dir) {
						if (dir === "down") {
								$(this).removeClass(fadeInLeft).addClass(fadeOutRight).css("opacity", "1");
						} else {
								$(this).removeClass(fadeOutRight).addClass(fadeInLeft).css("opacity", "1");
						};
				}, {
						offset: -$(window).height()
				});
		};
})(jQuery);