$(document).ready(function() {
    $('img.animated').hover(
    	function() {
    		$(this).addClass('fadeOutLeft'); // Добавляем класс fadeOutLeft
     	},
     	function() {
      		$(this).removeClass('fadeOutLeft'); // Убираем класс
     	}
    )
})

$(document).ready(function()) {
	$('.card').click(function() {
			$('.imgClick').toggleClass('activeImg');
			return false;
		})
})