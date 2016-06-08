<?php 

class Utils {
	public static function formatJSON($message, $type) {
		$result = new stdClass();
		$result->type = $type;
		$result->message = $message;

		echo json_encode($result, JSON_PRETTY_PRINT);
	}
}
