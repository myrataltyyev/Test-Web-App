<?php
require "config.php";

header("Access-Control-Allow-Origin: *");

// array for JSON response
$response = array();
 
// check for required fields
if (isset($_GET['pid'])) {
    $pid = $_GET['pid'];
 
    // deleting a row with prepared statement
    $query1 = "DELETE FROM Patients WHERE pid=?;";
    $stmt = mysqli_stmt_init($con);
    if (mysqli_stmt_prepare($stmt, $query1)) {
        mysqli_stmt_bind_param($stmt, "s", $pid);
        $result1 = mysqli_stmt_execute($stmt);
    }

    // get all patients from Patients table
    $query2 = "SELECT * FROM Patients;";
    $result2 = mysqli_query($con, $query2);
 
    // check whether row is deleted or not
    if ($result1) {
        $response["success"] = 1;
        $response["patients"] = array();

        // check for empty result
        if (mysqli_num_rows($result2) > 0) {
            while ($row = mysqli_fetch_assoc($result2)) {
                array_push($response["patients"], $row);
            }
        } else {
            $response["message"] = "No patients found";
        }

        echo json_encode($response);
    } else {
        // failed to delete a row
        $response["success"] = 0;
        $response["message"] = "Failed to delete the row";
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
