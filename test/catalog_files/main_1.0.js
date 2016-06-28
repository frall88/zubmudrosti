//Аякс отправка форм
   //Документация: http://api.jquery.com/jquery.ajax/
$("#searchButton").click(function() {

    var params = {
        'fio': $("#fio").val()
    }

    $.ajax({
        type: "POST",
        url: "./catalog_files/search.php",
        data: params
    }).done(function(data) {
        //console.log("Отправлено");
        //console.log(data);
        var clients = JSON.parse(data);
        var html = '<select id="selectClient"><option selected value="">--Выберите клиента--</option>';
        if (clients.clients.length > 0) {
            for (cli in clients.clients) {
                html += '<option value="' + clients.clients[cli].clientid + '">' + clients.clients[cli].fio + '</option>'
            }
        } else {
            html += '<option value="-1">Поиск не дал результатов</option>'
        }

        html += '</select>';

        $('#searchResult').html(html);
    }).fail(function(x, t, r) {

        console.log(x);
        console.log(t);
        console.log(r);

    }).always(function() {
        console.log('always');
    });
    return false;
});

$("#searchResult").change(function() {
    var params = {
        'clid': $("#selectClient option:selected").val()
    }
    $.ajax({
        type: "POST",
        url: "./catalog_files/client_events.php",
        data: params
    }).done(function(data) {
        //console.log("Отправлено");
        //console.log(data);
        var events = JSON.parse(data);
        var html = '<table id="clientEvents"><caption>История лечения</caption><tr>';
        html += '<th>Дата посещения</th>';
        html += '<th>Тип услуги</th>';
        html += '<th>Номер зуба</th>';
        html += '<th>Заключение врача</th></tr>';
        for (i in events.events) {
            html += '<tr><td>' + events.events[i].visitdate.substr(0, 10) + '</td><td>' +
                events.events[i].opertype + '</td><td>' +
                events.events[i].toothcode + '</td><td>' +
                events.events[i].conclusion + '</td></tr>';
        }
        html += '</table>';
        $('#eventResult').html(html);
    }).fail(function(x, t, r) {

        console.log(x);
        console.log(t);
        console.log(r);

    }).always(function() {
        console.log('always');
    });
    return false;
});

//Попап менеджер FancyBox
//Документация: http://fancybox.net/howto
//<a class="fancybox"><img src="image.jpg" /></a>
//<a class="fancybox" data-fancybox-group="group"><img src="image.jpg" /></a>
$(".fancybox").fancybox({
    openEffect	: 'elastic',
    closeEffect	: 'elastic',

    helpers : {
	    overlay : {
		    css : {
			    'background' : 'rgba(125, 125, 125, 0.3)'
		    }
	    },
    	title : {
    		type : 'float'
    	}
    }
});





//Аякс отправка формы регистрации пациента
	//Документация: http://api.jquery.com/jquery.ajax/
	$("#regClient").submit(function() {
		$.ajax({
			type: "POST",
			url: "./catalog_files/mail.php",
			data: $("#regClient").serialize()
		}).done(function() {
			alert("Вы успешно зарегистрировались! Информация будет доступна после обработки администратором.");
			setTimeout(function() {
				$.fancybox.close();
			}, 1000);
		});
		return false;
	});