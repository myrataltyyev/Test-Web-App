<?php
require "config.php";

header("Access-Control-Allow-Origin: *");
 
// array for JSON response
$response = array();

// get medicine name
$inputDrugName = '%'.stripslashes($_GET['drugName']).'%';

// get particular medicines from Medicines table
$query = "SELECT * FROM Medicines WHERE drugName LIKE ?;";
$stmt = mysqli_stmt_init($con);
if (mysqli_stmt_prepare($stmt, $query)) {
    mysqli_stmt_bind_param($stmt, "s", $inputDrugName);
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);
} 
 
// check for empty result
if (mysqli_num_rows($result) > 0) {
    $response["medicines"] = array();
    // looping through all results
    while ($row = mysqli_fetch_assoc($result)) {
        // push single medicine into final response array
        array_push($response["medicines"], $row);
    }
    // echoing JSON response
    echo json_encode($response);
} else {
    // no medicines found
    $response["message"] = "No medicines found";
    
    // echoing JSON response
    echo json_encode($response);
}
mysqli_stmt_close($stmt);
mysqli_close($con);
?>
