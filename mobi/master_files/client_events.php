<?php
require 'connect_db.php';
// Переменные с формы
//var_dump($_POST);
$clid = $_POST['clid'];
if (strlen($clid) == 0 or $clid == "-1"){
	echo '{"client": {}, "events":[]}';
	return;
};
// Cient
$query = "SELECT * FROM `clients` where clientid = ".$clid;
$res = mysql_query($query);
$row = mysql_fetch_array($res);
$json_data = '{"client":{';
$json_data .= '"clientid": "'.$row['clientid'].'",';
$json_data .= '"fio": "'.$row['fio'].'",';
$json_data .= '"birthdate": "'.$row['birthdate'].'",';
$json_data .= '"gender": "'.$row['gender'].'",';
$json_data .= '"phonenum": "'.$row['phonenum'].'",';
$json_data .= '"email": "'.$row['email'].'",';	
$json_data .= '"registerdt": "'.$row['registerdt'].'"},';

// Events
$query = "SELECT * FROM `visits` where clientid = ".$clid." order by visitdate";
$res = mysql_query($query);

$json_data .= '"events":[';
$items = 0;
while($row = mysql_fetch_array($res))
{	if ($items > 0){$json_data .=', ';};
	$json_data .= '{"clientid": "'.$clid.'",';
	$json_data .= '"id": "'.$row['id'].'",';
	$json_data .= '"visitdate": "'.$row['visitdate'].'",';
	$json_data .= '"opertype": "'.$row['opertype'].'",';
	$json_data .= '"toothcode": "'.$row['toothcode'].'",';
	$json_data .= '"conclusion": "'.$row['conclusion'].'"}';
	$items = $items + 1;	
}
$json_data .= ']}';
echo $json_data;
mysqli_close();
?>