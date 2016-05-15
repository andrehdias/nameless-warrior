<?php 

public class connection {
	private $host;
	private	$user;
	private $password;
	private $database;

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

