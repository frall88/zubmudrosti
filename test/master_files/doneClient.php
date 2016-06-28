<?php
require 'connect_db.php';
// Переменные с формы
//var_dump($_POST);
$clid = $_POST['clid'];
if (strlen($clid) == 0){
	echo '{"rowcount": 0, "errmes": ""}';
	return;
};
$query = "DELETE FROM `client_for_process` where clientid = $clid";
$res = mysql_query($query);
if (strlen(mysqli_error()) > 0){
	$errmes = mysqli_errno().': '.mysqli_error();
} else {
	$errmes = '';
};
$rowcount = mysql_affected_rows();
$json_data = '{"rowcount":'.$rowcount;
$json_data .= ',"errmes": "'.$errmes.'"}';
echo $json_data;
mysqli_close();
?>