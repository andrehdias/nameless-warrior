<?php 

class connection {
	private $host = "localhost";
	private	$user = "root";
	private $password;
	private $database = "nameless_warrior";

	function connect() {
		$mysqli = new mysqli($this->host, $this->user, $this->password, $this->database);
		if ($mysqli->connect_errno) {
		    echo "Failed to connect to MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
		}
		echo $mysqli->host_info . "\n";
	}	

	function close() {

	}
}