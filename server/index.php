<?php
$data = json_decode(file_get_contents('php://input'), TRUE);

$username = $data['username'];
$password = $data['password'];

// var_dump($data);

if($username == 'admin' && $password == 'admin') {
    echo 1;
} else {
    echo 0;
}

?>