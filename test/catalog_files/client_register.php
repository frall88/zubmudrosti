<?php
require 'connect_db.php';
// Переменные с формы
//var_dump($_POST);
$fio = $_POST['Фамилия:']." ".$_POST['Имя:']." ".$_POST['Отчество:'];
$birthdate = $_POST['Дата_рождения:'];
if ($_POST['Пол:'] == 'Женский'){
	$gender = 'f';
} else {
	$gender = 'm';
};
$phone = $_POST['Телефон:'];
$email = $_POST['E-mail:'];

$query = "SELECT count(1) as cnt FROM `clients` where fio = '$fio' and birthdate = '$birthdate'";
$res = mysql_query($query);
$row = mysql_fetch_array($res);
if ($row['cnt'] > 0){
	$json_data = '{"rowcount":'."0"
			 .', "errmes":"'.'User already exists!'
			 .'", "input":{'
			 .'"Фамилия:":"'.$_POST['Фамилия:']
			 .'", "Имя:":"'.$_POST['Имя:']
			 .'", "Отчество:":"'.$_POST['Отчество:']
			 .'", "Дата_рождения:":"'.$_POST['Дата_рождения:']
			 .'", "Пол:":"'.$_POST['Пол:']
			 .'", "Телефон:":"'.$_POST['Телефон:']
			 .'", "E-mail:":"'.$_POST['E-mail:']
			 .'", "project_name":"'.$_POST['project_name']
			 .'", "admin_email":"'.$_POST['admin_email']
			 .'", "form_subject":"'.$_POST['form_subject']
			 .'", "service_email":"'.$_POST['service_email']
			 .'"}}';
	mysqli_close();
	echo $json_data;
	return;
}

$query = "INSERT INTO `clients` (`fio`, `birthdate`, `gender`, `phonenum`, `email`) VALUES (rtrim('$fio'), '$birthdate', '$gender', '$phone', '$email')";
//echo $query;
$res = mysql_query($query);
if (strlen(mysqli_error()) > 0){
	$errmes = mysqli_errno().': '.mysqli_error();
} else {
	$errmes = '';
};
$rowcount = mysql_affected_rows();
$json_data = '{"rowcount":'.$rowcount
			 .', "errmes":"'.$errmes
			 .'", "input":{'
			 .'"Фамилия:":"'.$_POST['Фамилия:']
			 .'", "Имя:":"'.$_POST['Имя:']
			 .'", "Отчество:":"'.$_POST['Отчество:']
			 .'", "Дата_рождения:":"'.$_POST['Дата_рождения:']
			 .'", "Пол:":"'.$_POST['Пол:']
			 .'", "Телефон:":"'.$_POST['Телефон:']
			 .'", "E-mail:":"'.$_POST['E-mail:']
			 .'", "project_name":"'.$_POST['project_name']
			 .'", "admin_email":"'.$_POST['admin_email']
			 .'", "form_subject":"'.$_POST['form_subject']
			 .'", "service_email":"'.$_POST['service_email']
			 .'"}}';
mysqli_close();
echo $json_data;
?>
