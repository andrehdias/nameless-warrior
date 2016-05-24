<?php 

class Main {
	public static function request($class, $action, $data){
		try{			
			$conn = new Connection();
			$conn = $conn->connect();

			$obj = new $action($data);
			$obj->$action();	
		} catch (Exception $e) {
			print "Error:" . $e->getMessage() . "<br>";
			die();
		}
	}
}