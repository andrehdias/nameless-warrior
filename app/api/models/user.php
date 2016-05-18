class User {
	private $email;
	private $password;

	public __construct($email, $password) {
		$this->email = $email;
		$this->password = $password;
	}
}