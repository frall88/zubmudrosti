//Аякс отправка форм
   //Документация: http://api.jquery.com/jquery.ajax/
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

function getNews(){
    $.ajax({
        type: "GET",
        url: "./master_files/getNews.php"
    }).done(function(data) {
        //console.log("Отправлено");
        //console.log(data);
        var info = JSON.parse(data);
        if (info.clients.length == 0){
            $('#newsResult').html('<h4>Нет новых пациентов для обработки.</h4>');
            return;
        };
        var html = '<table id="client"><caption>Пациенты</caption><tr>';
        html += '<th>Ид.</th>';
        html += '<th>ФИО</th>';
        html += '<th>Дата рождения</th>';
        html += '<th>Пол</th>';
        html += '<th>№ телефона</th>';
        html += '<th>Эл. почта</th>';
        html += '<th>Дата регистрации</th></tr>';

        for (i in info.clients) {
            html += '<tr><td>' + info.clients[i].clientid + '</td><td>' +
            info.clients[i].fio + '</td><td>' +
            info.clients[i].birthdate + '</td><td>' +
            info.clients[i].gender + '</td><td>' +
            info.clients[i].phonenum + '</td><td>' +
            info.clients[i].email + '</td><td>' +
            info.clients[i].registerdt + '</td></tr>';
        };
        html += '</table>';

        $('#newsResult').html(html);
    }).fail(function(x, t, r) {

        console.log(x);
        console.log(t);
        console.log(r);

    }).always(function() {
        //console.log('always');
    });
    return false;
};

$("#newsButton").click(function() {
    getNews();
});

$("#doneClientButton").click(function() {

    var params = {
        'clid': $("#doneclid").val()
    }

    $.ajax({
        type: "POST",
        url: "./master_files/doneClient.php",
        data: params
    }).done(function(data) {
        //console.log("Отправлено");
        console.log(data);
        var recv = JSON.parse(data);
        if (recv.rowcount > 0) {
            getNews();
        };
        if (recv.errmes.length > 0){
            alert("Возникла ошибка! " + recv.errmes);
        };
    }).fail(function(x, t, r) {

        console.log(x);
        console.log(t);
        console.log(r);

    }).always(function() {
        //console.log('always');
    });
    return false;
});

function deleteEvent(eventId, clid){
    console.log('Want to delete - '+eventId);
    var answer = confirm("Вы действительно хотите удалить запись с номером ["+eventId+"]?");
    if (answer == true){
        //console.log('YES!');
        var params = {
            'eventId': eventId
        };
        $.ajax({
        type: "POST",
        url: "./master_files/deleteEvent.php",
        data: params
        }).done(function(data) {
            //console.log(data);
            var recv = JSON.parse(data);
            if (recv.rowcount > 0) {
                alert('Запись удалена.');
                searchResult(clid);
            } else {
                alert('Не удалось удалить запись: ' + recv.errmes);
            };
        });

    }
    
};

$("#addEventButton").click(function() {    
    var params = {
        'clientid': $("#clientid").val(),
        'visitdate': dateFormat($("#visitdate").val()),
        'opertype': $("#opertype").val(),
        'toothcode': $("#toothcode  option:selected").val(),
        'conclusion': $("#conclusion").val()
    };
    if (!isValidDate($("#visitdate").val())){
        alert("Неверный формат даты! Следуйте, пожалуйста, шаблону 'дд.мм.гггг'");
        return;
    };
    console.log(params);
    $.ajax({
        type: "POST",
        url: "./master_files/addEvent.php",
        data: params
    }).done(function(data) {
        //console.log("Отправлено");
        console.log(data);
        var recv = JSON.parse(data);
        if (recv.rowcount > 0) {
            alert('Запись добавлена.');            
            var msg = '<html>';
            var greet;
            if (recv.client.gender == 'f'){
                greet = 'Уважаемая ';
            } else {
                greet = 'Уважаемый ';
            };
            msg = '<p>' + greet +'<i>'+ recv.client.fio + '</i>, в Вашей медицинской карте произошли изменеия.</p>'; 
            msg = msg + '<p>Чтобы их увидеть, зайдите на наш сайт: <a href="http://zubmudrosti.com/catalog.html">http://zubmudrosti.com/catalog.html</a></p>';
            msg = msg + '<p>Всего Вам доброго и будьте здоровы!</p>';
            msg = msg + '</html>';
            var tomail = {"msg": msg,
                          "client_email": recv.client.email};
            //Уведомить клиента
            $.ajax({
                type: "POST",
                url: "./master_files/client_notify.php",
                data: tomail
            }).done(function(data){
                console.log('mail sent');
                console.log(data);
            });

        } else {
            alert('Что-то пошло не так :( - ' + recv.errmes);
        };
    }).fail(function(x, t, r) {

        console.log(x);
        console.log(t);
        console.log(r);

    }).always(function() {
        //console.log('always');
    });
    return false;
});

$("#clearEventButton").click(function() {
    document.getElementById("clientid").value='';
    document.getElementById("visitdate").value='';
    document.getElementById("opertype").value='';
    document.getElementById("toothcode").value='NULL';
    document.getElementById("conclusion").value='';
});


$("#searchButton").click(function() {

    var params = {
        'fio': $("#fio").val()
    }

    $.ajax({
        type: "POST",
        url: "./master_files/search.php",
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
        //console.log('always');
    });
    return false;
});

function searchResult(clid){
    var params = {
        'clid': clid
    }
    $.ajax({
        type: "POST",
        url: "./master_files/client_events.php",
        data: params
    }).done(function(data) {
        //console.log("Отправлено");
        //console.log(data);
        var info = JSON.parse(data);
        var html = '<table id="client"><caption>Пациент</caption><tr>';
        html += '<th>Ид.</th>';
        html += '<th>ФИО</th>';
        html += '<th>Дата рождения</th>';
        html += '<th>Пол</th>';
        html += '<th>№ телефона</th>';
        html += '<th>Эл. почта</th>';
        html += '<th>Дата регистрации</th>';
        html += '<th>Инструменты</th></tr>';

        html += '<tr><td>' + info.client.clientid + '</td><td>' +
        info.client.fio + '</td><td>' +
        info.client.birthdate + '</td><td>' +
        info.client.gender + '</td><td>' +
        info.client.phonenum + '</td><td>' +
        info.client.email + '</td><td>' +
        info.client.registerdt + '</td><td>' +
        '<button id="editClient">Редактировать</button></td></tr>';

        html += '</table>';

        html += '<table id="clientEvents"><caption>История лечения</caption><tr>';
        html += '<th>Ид.</th>';
        html += '<th>Дата посещения</th>';
        html += '<th>Тип услуги</th>';
        html += '<th>Номер зуба</th>';
        html += '<th>Заключение врача</th>';
        html += '<th>Инструменты</th></tr>';
        for (i in info.events) {
            html += '<tr><td>' + info.events[i].id + '</td><td>' +
                info.events[i].visitdate.substr(0, 10) + '</td><td>' +
                info.events[i].opertype + '</td><td>' +
                info.events[i].toothcode + '</td><td>' +
                info.events[i].conclusion + '</td><td>' +
                '<button id="editEvent_' + info.events[i].id + '" onclick="deleteEvent('+info.events[i].id +','+info.events[i].clientid+')">Удалить</button></td></tr>';
        }
        html += '</table>';
        $('#eventResult').html(html);
    });
};

$("#searchResult").change(function() {
    searchResult($("#selectClient option:selected").val());
});


$(document).ready(function() {
    $("td").click(function(e)   {
        console.log('td catched');
        //ловим элемент, по которому кликнули
        var t = e.target || e.srcElement;
        //получаем название тега
        var elm_name = t.tagName.toLowerCase();
        //если это инпут - ничего не делаем
        if(elm_name == 'input') {return false;}
        var val = $(this).html();
        var code = '<input type="text" id="edit" value="'+val+'" />';
        $(this).empty().append(code);
        $('#edit').focus();
        $('#edit').blur(function()  {
            var val = $(this).val();
            $(this).parent().empty().html(val);
        });
    });
});


$(window).keydown(function(event){
    //ловим событие нажатия клавиши    
    if(event.keyCode == 13) {   //если это Enter
        $('#edit').blur();  //снимаем фокус с поля ввода
    }
});

jQuery(function( $ ){
    $("#visitdate").mask("99.99.9999",{placeholder:"dd.mm.yyyy"});    
});