<?php

	header('Content-Type: application/json; charset=utf-8');

	function customFilterFields($string, $length) {

		$string = mb_substr($string, 0, $length);
		$string = htmlspecialchars(trim(strip_tags($string)));
		
		return preg_replace('#\s+#i', ' ', $string);

	}
	
	if(isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) === 'xmlhttprequest') {

		define('NO_KEEP_STATISTIC', true);
		define('NOT_CHECK_PERMISSIONS', true);
        
		$postArr = ['name', 'phone'];

		foreach($postArr as $value) {

			if(!isset($_POST[$value])) {

				die();

			}

		}

		if(trim((string)$_POST['name']) == '' || trim((string)$_POST['phone']) == '') {
			echo json_encode([
				'code' => 'error-fields'
			]);

			die();

		}
		
		$name = customFilterFields((string)$_POST['name'], 100);
		$phone = customFilterFields((string)$_POST['phone'], 100);

		$message = <<<HTML

			<b>Имя</b>: {$name}
			<br />
			<b>Телефон</b>: {$phone}

HTML;

		$headers = 'MIME-Version: 1.0'."\r\n";
		$headers .= 'Content-type: text/html; charset=utf-8'."\r\n";
		$headers .= 'From: dekors.shop <no-reply@'.$_SERVER['HTTP_HOST'].'>'."\r\n";

		$mail_list = [
			'dekors.shop@mail.ru',
		];

		foreach($mail_list as $mail) {

			mail(
				$mail,
				'Заявка на консультацию',
				preg_replace('#<script[^>]*>.*?</script>#is', '', $message),
				$headers
			);
			
		}
		echo json_encode([
			'code' => 'success'
		]);			

	} else {

		die();

	}

?>