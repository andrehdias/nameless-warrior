<?php 

class Utils {
	public static function formatJSON($data, $type) {
		$result = new stdClass();
		$result->type = $type;
		$result->data = $data;

		echo json_encode($result, JSON_PRETTY_PRINT);
	}
}
