<?php
require "config.php";

header("Access-Control-Allow-Origin: *");
 
// array for JSON response
$response = array();

// get patient name
$name = '%'.stripslashes($_GET['name']).'%';

// get particular patients from Patients table
$query = "SELECT * FROM Patients WHERE name LIKE ?;";
$stmt = mysqli_stmt_init($con);
if (mysqli_stmt_prepare($stmt, $query)) {
    mysqli_stmt_bind_param($stmt, "s", $name);
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);
} 
 
// check for empty result
if (mysqli_num_rows($result) > 0) {
    $response["patients"] = array();
    // looping through all results
    while ($row = mysqli_fetch_assoc($result)) {
        // push single patient into final response array
        array_push($response["patients"], $row);
    }
    // echoing JSON response
    echo json_encode($response);
} else {
    // no patients found
    $response["message"] = "No patients found";

    // echoing JSON response
    echo json_encode($response);
}
mysqli_stmt_close($stmt);
mysqli_close($con);
?>
