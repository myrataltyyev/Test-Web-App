<?php

header("Access-Control-Allow-Origin: *");

// array for JSON response
$response = array();

if (isset($_GET['token'])) {
    $token = $_GET['token'];

    if (!is_null($token)) {
        // include jwt file
        require_once('jwt.php');
    
        // get secret key
        $serverKey = '23f923ma93df220';
    
        try {
            $payload = JWT::decode($token, $serverKey, array('HS256'));
            $response["isAdmin"] = $payload->isAdmin;
            $response["dbName"] = $payload->dbName;
            $response["success"] = 1;
        }
        catch(Exception $e) {
            $response["success"] = 0;
            $response["message"] = $e->getMessage();
        }
    } else {
        $response["success"] = 0;
        $response["message"] = "You are not logged in with a valid token.";
    }
} else {
    $response["success"] = 0;
    $response["message"] = "Required field is missing";
}
// return response
echo json_encode($response);
?>
