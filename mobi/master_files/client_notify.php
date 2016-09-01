<?php

$method = $_SERVER['REQUEST_METHOD'];

$project_name = "zubmudrosti.com";
$admin_email  = "fortuna.valeriya@mail.ru";
$form_subject = "Уведомление";
$service_email  = "zubmudrosti.com@gmail.com";

if ( $method === 'POST' ) {

	$msg = trim($_POST["msg"]);
	$client_email = trim($_POST["client_email"]);

} else if ( $method === 'GET' ) {

	$msg = trim($_GET["msg"]);
	$client_email = trim($_GET["client_email"]);

}

mail($client_email, $form_subject, $msg, "From: $project_name <$service_email>" . "\r\n" . "Reply-To: $service_email" . "\r\n" . "X-Mailer: PHP/" . phpversion() . "\r\n" . "Content-type: text/html; charset=\"utf-8\"");
