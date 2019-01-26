<?php
require "config.php";

header("Access-Control-Allow-Origin: *");
 
// array for JSON response
$response = array();
$response["medicines"] = array();

// get all medicines from Medicines table
$query = "SELECT * FROM Medicines";
$result = mysqli_query($con, $query);
 
// check for empty result
if (mysqli_num_rows($result) > 0) {
    $response["success"] = 1;
    // looping through all results
    while ($row = mysqli_fetch_assoc($result)) {
        // push single medicine into final response array
        array_push($response["medicines"], $row);
    }
    // echoing JSON response
    echo json_encode($response);
} else {
    // no medicines found
    $response["success"] = 0;
    $response["message"] = "No medicines found";
    // echo no users JSON
    echo json_encode($response);
}
mysqli_close($con);
?>
