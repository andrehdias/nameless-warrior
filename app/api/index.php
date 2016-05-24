<?php 

require_once('lib/utils.php');
require_once('lib/connection.php');
require_once('lib/main.php');
require_once('models/user.php');
require_once('models/character.php');

$class = $_POST['class'];
$action = $_POST['action'];
$data = $_POST['data'];

Main::request($class, $action, $data);