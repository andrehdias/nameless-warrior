<?php 

require_once('lib/utils.php');
require_once('lib/connection.php');

$conn = new Connection();
$conn->connect();

echo $_POST;