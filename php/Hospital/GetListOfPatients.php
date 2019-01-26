<?php
require "config.php";

header("Access-Control-Allow-Origin: *");
 
// array for JSON response
$response = array();
$response["patients"] = array();

// get all patients from Patients table
$query = "SELECT * FROM Patients";
$result = mysqli_query($con, $query);
 
// check for empty result
if (mysqli_num_rows($result) > 0) {
    $response["success"] = 1;
    // looping through all results
    while ($row = mysqli_fetch_assoc($result)) {
        // push single patient into final response array
        array_push($response["patients"], $row);
    }
    // echoing JSON response
    echo json_encode($response);
} else {
    // no patients found
    $response["success"] = 0;
    $response["message"] = "No patients found";
    // echo no users JSON
    echo json_encode($response);
}
mysqli_close($con);
?>
