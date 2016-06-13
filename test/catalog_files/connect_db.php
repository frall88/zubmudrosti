<?php
// Файл datatransfer.php
$host='zubmudro.mysql.ukraine.com.ua'; 
$database='zubmudro_db'; 
$user='zubmudro_db'; 
$pswd='8FjBpFPz'; 
 
$dbh = mysql_connect($host, $user, $pswd) or die("Не могу соединиться с MySQL.");
mysql_select_db($database) or die("Не могу подключиться к базе.");
mysql_query("SET NAMES 'utf8'",$dbh);
?>
