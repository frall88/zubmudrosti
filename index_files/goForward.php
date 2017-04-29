<?php
// Переменные с формы
//var_dump($_POST);
$secret_key = "Pavel";
$respond_ok = '{"url": "http://zubmudrosti.com/mobi/admin.html"}';
$respond_err = '{"url": ""}';
$key = $_POST['key'];
if ($key == $secret_key){
	echo $respond_ok;
	return;
};

echo $respond_err;
?>