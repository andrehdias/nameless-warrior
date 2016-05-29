<?php 

/*
* Connection Class
* Thanks @echart
* */
class Connection {
	private $connection;
	private static $instance;	
	private $host;
	private	$user;
	private $password;
	private $database;

	//method to instance or get an instance
	public static function getInstance() {
		//if this shit does not have an instance, make one
		if(!self::$instance) {
			self::$instance = new self();
		}
		//return instance
		return self::$instance;
	}

	//set configs according to ini file
	public function config() {
		$config = parse_ini_file('config.ini');

		$this->host = $config['host'];
		$this->user = $config['user'];
		$this->password = $config['password'];
		$this->database = $config['database'];
	}

	//start connection
	private function __construct() {
		try{			
			$this->config();
			//make the connection
			$this->connection = new PDO("mysql:host=$this->host;dbname=$this->database", $this->user, $this->password);
		}catch(PDOException $e){
			//if pdo excpetion DIE and show the error
			die($e->getMessage());
		}catch(Exception $e){
			// if gets an general exception, just show and continues
			echo $e->getMessage();
		}
	}


	//avoid duplicate object
	private function __clone() {}

	//return the connection
	public function connect() {
		return $this->connection;
	}

	//disconnect and  unst $instance
	public function disconnect(){
		//make the connection null
		$this->connection=null;
		//unset instance, it's necessary because if doesn't, you can't connect anymore, because you have an instance but not the connection
		unset($instance);
	}
}