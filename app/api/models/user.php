<?php 

class User {
	private $email;
	private $password;
	private $id;

	public function __construct($data = null) {		
		$this->email = ($data->email) ? $data->email : null;
		$this->password = ($data->password) ? md5($data->password) : null;
		$this->id = ($data->id) ? $data->id : null;

		$this->conn = Connection::getInstance()->connect();
	}
 
	public function save() {
		try{
			$query = $this->conn->prepare("INSERT INTO user(email, password) values (:email, :password)");

			$query->bindParam(':email', $this->email);
			$query->bindParam(':password', $this->password);			

			$query->execute();
			$this->id = $this->conn->lastInsertID();			

			return Utils::formatJSON($this->id, 'success');
		} catch (PDOException $e) {
			return Utils::formatJSON($e->getMessage(), 'error');
		}
	}

	public function get() {
		try{
			$query = $this->conn->prepare("SELECT * FROM user WHERE id = :id LIMIT 1");
			$query->bindParam(':id', $this->id);
			$query->execute();
			$result = $query->fetch(PDO::FETCH_ASSOC);

			return Utils::formatJSON($result, 'success');
		} catch (PDOException $e) {
			return Utils::formatJSON($e->getMessage(), 'error');
		}
	}	

	public function login(){
		
	}
}