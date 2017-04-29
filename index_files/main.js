
$( document ).ready(function() {
    $('#friends').data('counter', 0).click(function() {
        console.log( "click!" );
        var counter = $(this).data('counter');   // Получаем значение
        $(this).data('counter', counter + 1);    // Увеличиваем значение на 1
        if (counter == 2){            
            var key = prompt("Введите пароль");
            $.ajax({
                type: "POST",
                url: "./index_files/goForward.php",
                data: {"key": key}
            }).done(function(data){                
                console.log(data);
                var recv = JSON.parse(data);                
                document.location.href=recv.url;
            });
            counter = 0;
            $(this).data('counter', 0)
        };
    });
});