<?php 

require_once('lib/utils.php');
require_once('lib/connection.php');
require_once('lib/main.php');
require_once('models/user.php');
require_once('models/character.php');

print_r($_POST);
exit;

if(isset($_POST['target']) && isset($_POST['action']) && isset($_POST['formData'])) {
	$target = $_POST['target'];
	$action = $_POST['action'];
	$formData = $_POST['formData'];	
	
	Main::request($target, $action, $formData);
} else {
	echo Utils::formatJSON("Invalid data", 'error');
}
