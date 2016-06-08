<?php 

require_once('lib/utils.php');
require_once('lib/connection.php');
require_once('lib/main.php');
require_once('models/user.php');
require_once('models/character.php');

if(isset($_POST['target']) && isset($_POST['action'])) {
	$target = $_POST['target'];
	$action = $_POST['action'];	
	
	Main::request($target, $action, $_POST);
} else {
	echo Utils::formatJSON("Invalid data", 'error');
}
