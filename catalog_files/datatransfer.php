<?php
// Файл datatransfer.php
$host='zubmudro.mysql.ukraine.com.ua'; 
$database='zubmudro_db'; 
$user='zubmudro_db'; 
$pswd='8FjBpFPz'; 
 
$dbh = mysql_connect($host, $user, $pswd) or die("Не могу соединиться с MySQL.");
mysql_select_db($database) or die("Не могу подключиться к базе.");
mysql_query("SET NAMES 'utf8'",$dbh);
$query = "SELECT * FROM `clients`";
$res = mysql_query($query);
while($row = mysql_fetch_array($res))
{
echo "Ид. Клиента: ".$row['clientid']."<br>\n";
//echo "ФИО: ".mb_convert_encoding($row['fio'], "UTF-8", "cp1251")."<br>\n";
echo "ФИО: ".$row['fio']."<br>\n";
echo "Дата рождения: ".$row['birthdate']."<br>\n";
//echo "Пол: ".$row['gender']."<br>\n"; 
if ($row['gender'] == 'm'){
	echo "Пол: Мужской <br>\n";
} elseif ($row['gender'] == 'f'){
	echo "Пол: Женский <br>\n";
} elseif (1 == 1){
	echo "Пол: ".$row['gender']."? <br>\n";
};
echo "Моб. тел.: ".$row['phonenum']."<br>\n";
echo "E-mail: ".$row['email']."<br>\n";
echo "Дата регистрации: ".$row['registerdt']."<br><hr>\n";
}
?>