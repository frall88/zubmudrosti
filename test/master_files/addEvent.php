<?php
require 'connect_db.php';
// Переменные с формы
//var_dump($_POST);
$clid = $_POST['clientid'];
$visitdate = $_POST['visitdate'];
$opertype = $_POST['opertype'];
$toothcode = $_POST['toothcode'];
$conclusion = $_POST['conclusion'];

if (strlen($clid) == 0){
	echo '{"rowcount": 0, "errmes": "Не указан ид.пациента!"}';
	return;
};

$query = "SELECT * FROM `clients` where clientid = $clid";
$res = mysql_query($query);
$rowcount = mysql_affected_rows();
if ($rowcount == 0){
	echo '{"rowcount": 0, "errmes": "Не верно указан ид.пациента! ['.$clid.']"}';
	return;
};
$row = mysql_fetch_array($res);

$json_data = '{"client":{';
$json_data .= '"clientid": "'.$row['clientid'].'",';
$json_data .= '"fio": "'.$row['fio'].'",';
$json_data .= '"birthdate": "'.$row['birthdate'].'",';
$json_data .= '"gender": "'.$row['gender'].'",';
$json_data .= '"phonenum": "'.$row['phonenum'].'",';
$json_data .= '"email": "'.$row['email'].'",';	
$json_data .= '"registerdt": "'.$row['registerdt'].'"},';

$query = "INSERT INTO `visits` (`clientid`, `visitdate`, `opertype`, `toothcode`, `conclusion`) VALUES ($clid, '$visitdate', '$opertype', $toothcode, '$conclusion')";

$res = mysql_query($query);
if (strlen(mysqli_error()) > 0){
	$errmes = mysqli_errno().': '.mysqli_error();
} else {
	$errmes = '';
};
$rowcount = mysql_affected_rows();
$json_data .= '"rowcount":'.$rowcount;
$json_data .= ',"errmes": "'.$errmes.'"}';
echo $json_data;
mysqli_close();
?>