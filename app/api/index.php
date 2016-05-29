<?php 

require_once('lib/utils.php');
require_once('lib/connection.php');
require_once('lib/main.php');
require_once('models/user.php');
require_once('models/character.php');

if(isset($_POST['class']) && isset($_POST['action']) && isset($_POST['data'])) {
	$class = $_POST['class'];
	$action = $_POST['action'];
	$data = $_POST['data'];	
	
	Main::request($class, $action, $data);
} else {
	echo Utils::formatJSON("Invalid data", 'error');
}
