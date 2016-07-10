<?php
require 'connect_db.php';
// Переменные с формы
//var_dump($_POST);
$eventId = $_POST['eventId'];

if (strlen($eventId) == 0){
	echo '{"rowcount": 0, "errmes": "Не указан ид. события!"}';
	return;
};

$query = "DELETE FROM `visits` where id = $eventId";
$res = mysql_query($query);
if (strlen(mysqli_error()) > 0){
	$errmes = mysqli_errno().': '.mysqli_error();
} else {
	$errmes = '';
};
$rowcount = mysql_affected_rows();
$json_data .= '{"rowcount":'.$rowcount;
$json_data .= ',"errmes": "'.$errmes.'"}';
echo $json_data;
mysqli_close();
?>