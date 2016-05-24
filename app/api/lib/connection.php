<?php 

class Connection {
	private $host;
	private	$user;
	private $password;
	private $database;

	public function __construct() {
		$config = parse_ini_file('config.ini');

		$this->host = $config['host'];
		$this->user = $config['user'];
		$this->password = $config['password'];
		$this->database = $config['database'];
	}

	public function connect() {		
		try {
			$conn = new PDO("mysql:host=$this->host;dbname=$this->database", $this->user, $this->password);
		} catch (PDOException $e) {
			print "Error:" . $e->getMessage() . "<br>";
			die();
		}

		return $conn;
	}
}