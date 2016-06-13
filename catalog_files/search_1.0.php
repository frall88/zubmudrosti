<?php
require 'connect_db.php';
// Переменные с формы
//var_dump($_POST);
$fio = $_POST['fio'];
if (strlen($fio) == 0){
	echo '{"clients":[]}';
	return;
};
$query = "SELECT * FROM `clients` where fio like '%$fio%'";
$res = mysql_query($query);

$json_data = '{"clients":[';
while($row = mysql_fetch_array($res))
{	if (strlen($json_data) > 20){$json_data .=', ';};
	$json_data .= '{"clientid": "'.$row['clientid'].'",';
	$json_data .= '"fio": "'.$row['fio'].'",';
	$json_data .= '"birthdate": "'.$row['birthdate'].'",';
	$json_data .= '"gender": "'.$row['gender'].'",';
	$json_data .= '"phonenum": "'.$row['phonenum'].'",';
	$json_data .= '"email": "'.$row['email'].'",';	
	$json_data .= '"registerdt": "'.$row['registerdt'].'"}';
}
$json_data .= ']}';
echo $json_data;
?>