//Аякс отправка форм
   //Документация: http://api.jquery.com/jquery.ajax/
$("#searchButton").click(function() {
    teethClear();
    var bdate = dateFormat($("#birthdate").val());
    var params = {
        'fio': $("#fio").val(),
        'birthdate': bdate
    };
	//console.log(params);

    $.ajax({
        type: "POST",
        url: "./catalog_files/search.php",
        data: params
    }).done(function(data) {        
        //console.log(data);
        var events = JSON.parse(data);
        var html = '';
        if (events.events.length > 0){
            if (events.events == -1){
                html = '<p class="alert">Заполните, пожалуйста, поля ввода для поиска.</p>';
                $('#eventResult').html(html);
                return;
            }
            if (events.events == "No such client"){
                html = '<p class="alert">Пациента нет в базе данных. Проверьте корректность введенных данных или зарегистрируйтесь.</p>';
                $('#eventResult').html(html);
                return;
            }
            html = '<table id="clientEvents"><caption>История лечения</caption><tr>';
            html += '<th>Дата посещения</th>';
            html += '<th>Тип услуги</th>';
            html += '<th>Номер зуба</th>';
            html += '<th>Заключение врача</th></tr>';
            for (i in events.events) {
                html += '<tr><td>' + events.events[i].visitdate.substr(0, 10) + '</td><td>' +
                    events.events[i].opertype + '</td><td>' +
                    events.events[i].toothcode + '</td><td>' +
                    events.events[i].conclusion + '</td></tr>';
                    toothFire(events.events[i]);
            }
            html += '</table>';
        } else {
            html = '<p class="alert">В карточке по данному пациенту нет записей.</p>';
        }
        $('#eventResult').html(html);
    }).fail(function(x, t, r) {

        console.log(x);
        console.log(t);
        console.log(r);

    }).always(function() {
        //console.log('always');
    });
    return false;
});


//Попап менеджер FancyBox
//Документация: http://fancybox.net/howto
//<a class="fancybox"><img src="image.jpg" /></a>
//<a class="fancybox" data-fancybox-group="group"><img src="image.jpg" /></a>
$(".fancybox").fancybox({
    openEffect  : 'elastic',
    closeEffect : 'elastic',

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


function isValidDate(val)
{
  var val_r = val.split(".");
  var curDate = new Date(parseInt(val_r[2]), parseInt(val_r[1])-1, parseInt(val_r[0]));
  return (
    curDate.getFullYear() == val_r[2]
    && curDate.getMonth()+1 == val_r[1]
    && curDate.getDate() == val_r[0]
  );
};

function dateFormat(val){
    var val_r = val.split(".");
    return val_r[2] + "-" + val_r[1] + "-" + val_r[0];
};

function toothFire(data){
    var id = "#active" + data.toothcode;
    $( id ).css( "opacity", "1" );
    var info = $( id + " .history" ).html();
    info += "<p style='border-bottom: 1px solid silver;'>" + data.opertype + "</p>";
    $( id + " .history" ).html(info);
};

function teethClear(){
    $( ".history" ).each(function() {
        $( this ).html("");
    });
    $( ".active" ).css("opacity", "0");
};
//Аякс отправка формы регистрации пациента
//Документация: http://api.jquery.com/jquery.ajax/
$("#regClient").submit(function() {
    params = $("#regClient").serialize();
    bdate = document.getElementsByName("Дата рождения:")[0].value;
    if (!isValidDate(bdate)){
        alert("Неверный формат даты! Следуйте, пожалуйста, шаблону 'гггг-мм-дд'");
        return;
    }
    $.ajax({
        type: "POST",
        url: "./catalog_files/client_register.php",
        data: params
    }).done(function(data) {
        //console.log(data);
        var recv = JSON.parse(data);
        var tomail = recv.input;
        if (recv.rowcount == 1){
            tomail['Сохранено в базе:'] = "Да";
            alert("Вы успешно зарегистрировались! Информация будет доступна после обработки администратором.");
        } else {
            tomail['Сохранено в базе:'] = "Нет";
            tomail['Ошибка:'] = recv.errmes;
            alert("Произошла ошибка при сохранении ["+recv.errmes+"]. Проверьте корректность введенных данных.");
        };
        //console.log(tomail);
        $.ajax({
            type: "POST",
            url: "./catalog_files/mail.php",
            data: tomail
        }).done(function(data){
            //console.log('mail sent');
            //console.log(data);
        });
        setTimeout(function() {
            $.fancybox.close();
        }, 1000);
    });
    return false;
});

jQuery(function( $ ){
    $('#user_phone').each(function(){
      $(this).mask("(999) 999-99-99");
    });

    $("#user_bdate").mask("99.99.9999",{placeholder:"dd.mm.yyyy"});
    $("#birthdate").mask("99.99.9999",{placeholder:"dd.mm.yyyy"});
});