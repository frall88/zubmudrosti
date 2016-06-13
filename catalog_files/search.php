<?php
require 'connect_db.php';
// Переменные с формы
//var_dump($_POST);
$fio = $_POST['fio'];
$birthdate = $_POST['birthdate'];
if (strlen($fio) == 0){
	echo '{"events":[-1]}';
	return;
};
$query = "SELECT IFNULL( MAX( clientid ) , -1 ) as clid FROM `clients` where fio = '$fio' and birthdate = '$birthdate'";
$res = mysql_query($query);
$row = mysql_fetch_array($res);
if ($row['clid'] == -1){
	echo '{"events":["No such client"]}';
	return;
}

$query = "SELECT * FROM `visits` where clientid = ".$row['clid']." order by visitdate";
$res = mysql_query($query);

$json_data = '{"events":[';
while($row = mysql_fetch_array($res))
{	if (strlen($json_data) > 20){$json_data .=', ';};
	$json_data .= '{"clientid": "'.$row['clientid'].'",';
	$json_data .= '"id": "'.$row['id'].'",';
	$json_data .= '"visitdate": "'.$row['visitdate'].'",';
	$json_data .= '"opertype": "'.$row['opertype'].'",';
	$json_data .= '"toothcode": "'.$row['toothcode'].'",';
	$json_data .= '"conclusion": "'.$row['conclusion'].'"}';	
}
$json_data .= ']}';
mysqli_close();
echo $json_data;
?>
