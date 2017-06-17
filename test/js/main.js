// Появление кнопки наверх
jQuery(function(f){
	var element = f('.toTop');
	f(window).scroll(function(){
		element['fade'+(f(this).scrollTop() > 1000 ? 'In': 'Out')](500);
	});
});

// Подсвечивать пункты меню при скролле
var menu_selector = ".topMenu";

function onScroll(){
    var scroll_top = $(document).scrollTop();
    $(menu_selector + " a").each(function(){
        var hash = $(this).attr("href");
        var target = $(hash);
        if (target.position().top <= scroll_top && target.position().top + target.outerHeight() > scroll_top) {
            $(menu_selector + " a.active").removeClass("active");
            $(this).addClass("active");
        } else {
            $(this).removeClass("active");
        }
    });
}

$(document).ready(function(){
	$(".navBut").click(function(){
		$(".floatMenu").toggleClass("active");
		return false;
	});
	
	$(".left").click(function(){
		//$(".prew").css('position', 'absolute');
		$(".prew").animate({'left':'+=360px'}, 1000);
	});
	$(".right").click(function(){
		//$(".prew").css('position', 'absolute');
		$(".prew").animate({'left':'-=360px'}, 1000);
	});
});

// Плавный переход между пунктами меню
$(document).ready(function() {
		//$(".navBut").click(function () {
        //$(".floatMenu").toggleClass("active");
        //console.log(log);
        //return false;
		//});

    $(document).on("scroll", onScroll);

    $("a[href^=#]").click(function(e){
        e.preventDefault();

        $(document).off("scroll");
        $(menu_selector + " a.active").removeClass("active");
        $(this).addClass("active");
        var hash = $(this).attr("href");
        var target = $(hash);

        $("html, body").animate({
            scrollTop: target.offset().top
        }, 500, function(){
            window.location.hash = hash;
            $(document).on("scroll", onScroll);
        });

    });

});

$(document).ready(function() {

	//Попап менеджер FancyBox
	//Документация: http://fancybox.net/howto
	//<a class="fancybox"><img src="image.jpg" /></a>
	//<a class="fancybox" data-fancybox-group="group"><img src="image.jpg" /></a>
	$(".fancybox").fancybox({
		openEffect : 'elastic',
		closeEffect : 'elastic'
	});

	//Аякс отправка форм
	//Документация: http://api.jquery.com/jquery.ajax/
	$("#callback").submit(function() {
		$.ajax({
			type: "GET",
			url: "mail.php",
			data: $("#callback").serialize()
		}).done(function() {
			alert("Спасибо за заявку! Мы с Вами свяжемся.");
			setTimeout(function() {
				$.fancybox.close();
			}, 1000);
		});
		return false;
	});

	//Параллакс эффект для изображений при скроле
	$(window).scroll(function() {

		var st = $(this).scrollTop() /10;

		$(".sect-img, .sect-text2").css({
			"transform" : "translate3d(0px, -" + st / 5  + "%, .01px)",
			"-webkit-transform" : "translate3d(0px, -" + st / 5  + "%, .01px)"
		});

	});
	//Конец скрипта

	$(".animation_1").animated("fadeInLeft", "fadeOutLeft");
	$(".animation_2").animated("fadeInRight", "fadeOutRight");

});


window.onload = function() {
 
 //Создаем сам фон и его функции
 var canvas = document.getElementById("flying-bubbles");
 var ctx = canvas.getContext("2d");
 
 //Установим размеры фона равны размеру окна
 var W = window.innerWidth, H = window.innerHeight;
 canvas.width = W;
 canvas.height = H;
 
 //Создаем массив кругов
 var circles = [];
 for(var i = 0; i < 20; i++ ){
 circles.push(new create_circle());
 }
 
 //Функции для создания кругов с различными положениями и скоростями
 function create_circle() {
 //Случайная позиция
 this.x = Math.random()*W;
 this.y = Math.random()*H;
 
 //Случайная скорость
 this.vx = 0.1+Math.random()*1;
 this.vy = -this.vx;
 
 //Случайный радиус
 this.r = 10 + Math.random()*50;
 }
 
 //Функции для прорисовки фона
 function draw() {
 //Create the gradient
 var grad = ctx.createLinearGradient(0, 0, W, H);
 grad.addColorStop(0, 'rgb(19, 105, 168)');
 grad.addColorStop(1, 'rgb(0, 0, 0)');
 
 //Заполняем фон градиентом
 ctx.globalCompositeOperation = "source-over";
 ctx.fillStyle = grad;
 ctx.fillRect(0,0,W,H);
 
//Заполняем фон кругами
 for(var j = 0; j < circles.length; j++) {
 var c = circles[j];
 
 //Рисуем круги и размытие
 ctx.beginPath();
 ctx.globalCompositeOperation = "lighter";
 ctx.fillStyle = grad;
 ctx.arc(c.x, c.y, c.r, Math.PI*2, false);
 ctx.fill();
 
 //Используем скорость
 c.x += c.vx;
 c.y += c.vy;
 
 //Для предотвращения перемещения кругов за рамки
 if(c.x < -50) c.x = W+50;
 if(c.y < -50) c.y = H+50;
 if(c.x > W+50) c.x = -50;
 if(c.y > H+50) c.y = -50;
 }
 }
 
 setInterval(draw, 25);
 
}
