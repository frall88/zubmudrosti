<?php
require 'connect_db.php';
// Переменные с формы
//var_dump($_POST);
$clid = $_POST['clid'];
if (strlen($clid) == 0 or $clid == "-1"){
	echo '{"events":[]}';
	return;
};
$query = "SELECT * FROM `visits` where clientid = ".$clid." order by visitdate";
$res = mysql_query($query);

$json_data = '{"events":[';
while($row = mysql_fetch_array($res))
{	if (strlen($json_data) > 20){$json_data .=', ';};
	$json_data .= '{"clientid": "'.$clid.'",';
	$json_data .= '"id": "'.$row['id'].'",';
	$json_data .= '"visitdate": "'.$row['visitdate'].'",';
	$json_data .= '"opertype": "'.$row['opertype'].'",';
	$json_data .= '"toothcode": "'.$row['toothcode'].'",';
	$json_data .= '"conclusion": "'.$row['conclusion'].'"}';	
}
$json_data .= ']}';
echo $json_data;
?>