<?php

header("Access-Control-Allow-Origin: *");

// connection details
$host = "localhost";
$user = "root";
$password = "root";

// array for JSON response
$response = array();
 
// check for required fields
if (isset($_GET['username']) && isset($_GET['password']) && isset($_GET['dbName'])) {
    
    // connect to msql database
    $dbName = $_GET['dbName'];
    $con = mysqli_connect($host, $user, $password, $dbName);

    $username = $_GET['username'];
    $password = $_GET['password'];

    // check application type
    $query = "SELECT * FROM Users WHERE username=?;";
    $stmt = mysqli_stmt_init($con);
    if (mysqli_stmt_prepare($stmt, $query)) {
        mysqli_stmt_bind_param($stmt, "s", $username);
        mysqli_stmt_execute($stmt);
        $result = mysqli_stmt_get_result($stmt);
    }

    // check for empty result
    if (mysqli_num_rows($result) > 0) {
        // fetch the data
        $row = mysqli_fetch_assoc($result);

        // check for password correctness
        if (password_verify($password, $row["password"])) {
            // successful login
            $response["success"] = 1;

            // include jwt file
            require_once('jwt.php');

            // expiration time 
            $exp = strtotime("+3 hours");

            // get secret key
            $serverKey = '23f923ma93df220';

            // create a token
            $payloadArray = array();
            $payloadArray["isAdmin"] = $row["isAdmin"];
            $payloadArray["dbName"] = $dbName;
            $payloadArray["exp"] = $exp;
            $token = JWT::encode($payloadArray, $serverKey);

            $response["token"] = $token;
            $response["isAdmin"] = $row["isAdmin"];
            echo json_encode($response);
        } else {
            $response["success"] = 0;
            $response["message"] = "Password is incorrect";
            echo json_encode($response);
        }
    } else {
        $response["success"] = 0;
        $response["message"] = "No user found";
        echo json_encode($response);
    }
    mysqli_stmt_close($stmt);
} else {
    // required field is missing
    $response["success"] = 0;
    $response["message"] = "Required field is missing";
    echo json_encode($response);
}
mysqli_close($con);
?>
