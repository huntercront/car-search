<?php
// Файлы phpmailer
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;


require './PHPMailer.php';
require './SMTP.php';
require './Exception.php';



// Переменные
header("Content-Type: application/json");
$v = json_decode(stripslashes($_GET["data"]));
$name = $v->name;
$number = $v->phone;
$message = $v->message;


// Настройки
$mail = new PHPMailer;
// $mail->IsSMTP(); 


$mail->Host = "smtp.os.com"; 
$mail->SMTPAuth = true; 
$mail->Username = "localhosr@os.com"; // Ваш логин в Яндексе. Именно логин, без @yandex.ru
$mail->Password = "123"; // Ваш пароль
$mail->SMTPSecure = "ssl"; 
$mail->Port = 587;



$mail->setFrom("localhosr@os.com"); // Ваш Email
$mail->addAddress("example@mail.ru"); // Email получателя

 
// Письмо
$mail->isHTML(true); 
$mail->Subject = "Заголовок"; // Заголовок письма
$mail->Body = "Имя $name . Телефон $number . Сообщение $message"; // Текст письма
// Результат
if(empty($error)){
	if(!$mail->send()){
			$error[] = 'There was an error sending the mail. Please try again!';
	}
}
echo json_encode($v);
// echo json_encode([
// "status" => count($error)==0 ? 1 : 0,
// "error" => $error
// ]);
?>