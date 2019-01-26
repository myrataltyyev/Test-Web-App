<?php

header("Access-Control-Allow-Origin: *");

// connection details
$host = "localhost";
$user = "root";
$password = "root";

// array for JSON response
$response = array();
 
// check for required fields
if (isset($_POST['username']) && isset($_POST['password']) && isset($_POST['dbName'])) {
    // connect to msql database
    $dbName = $_POST['dbName'];
    $con = mysqli_connect($host, $user, $password, $dbName);

    $username = $_POST['username'];
    $hashed_password = password_hash($_POST['password'], PASSWORD_DEFAULT);

    // check application type
    $query = "INSERT INTO Users(username, password) 
              VALUES (?, ?;";
    $stmt = mysqli_stmt_init($con);
    if (mysqli_stmt_prepare($stmt, $query)) {
        mysqli_stmt_bind_param($stmt, "ss", $username, $hashed_password);
        $result = mysqli_stmt_execute($stmt);
    } 

    // check for empty result
    if ($result) {
        // successful login
        $response["success"] = 1;
        echo json_encode($response);
    } else {
        $response["success"] = 0;
        $response["message"] = "Username exists";
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
