<?php 

class Main {
	public static function request($class, $action, $data){
		try{			
			$obj = new $class($data);
			$obj->$action();	
		} catch (Exception $e) {
			return Utils::formatJSON($e->getMessage(), 'error');
		}
	}
}