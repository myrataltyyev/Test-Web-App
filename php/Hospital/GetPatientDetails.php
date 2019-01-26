<?php
require "config.php";

header("Access-Control-Allow-Origin: *");
 
// array for JSON response
$response = array();

// check for required fields
if (isset($_GET['pid'])) {
    $pid = $_GET['pid'];

    // get patient details from Patients table
    $query = "SELECT * FROM Patients WHERE pid = ?;";
    $stmt = mysqli_stmt_init($con);
    if (mysqli_stmt_prepare($stmt, $query)) {
        mysqli_stmt_bind_param($stmt, "s", $pid);
        mysqli_stmt_execute($stmt);
        $result = mysqli_stmt_get_result($stmt);
    }

    // check for empty result
    if (mysqli_num_rows($result) > 0) {
        $response["success"] = 1;

        $row = mysqli_fetch_assoc($result);
        $response["name"] = $row["name"];
        $response["bio"] = $row["bio"];

        // echoing JSON response
        echo json_encode($response);
    } else {
        // no patient found
        $response["success"] = 0;
        $response["message"] = "No patient found";
        // echo no users JSON
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
