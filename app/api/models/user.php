<?php 

class User {
	private $email;
	private $password;
	private $id;

	public function __construct($data) {
		$this->email = $data->email;
		$this->password = $data->password;
	}
 
	public function save() {
		try{
			$query = $conn->prepare("INSERT INTO user(email, password) values (:email, :password)");

			$query->bindParam(':email', $this->email);
			$query->bindParam(':password', $this->password);			

			$query->execute();
			$this->id = $conn->lastInsertID();			
			return $this->id;
		} catch (PDOException $e) {
			echo $e->getMessage();
		}
	}

	public function get() {

	}	
}