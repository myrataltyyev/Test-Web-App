<?php
require "config.php";

header("Access-Control-Allow-Origin: *");

// array for JSON response
$response = array();
 
// check for required fields
if (isset($_GET['mid']) && isset($_GET['pid'])) {
    $mid = $_GET['mid'];
    $pid = $_GET['pid'];
 
    // inserting a new row with prepared statement
    $query1 = "INSERT INTO Patient_Medicine(pid, mid) VALUES(?, ?);";
    $stmt = mysqli_stmt_init($con);
    if (mysqli_stmt_prepare($stmt, $query1)) {
        mysqli_stmt_bind_param($stmt, "ss", $pid, $mid);
        $result1 = mysqli_stmt_execute($stmt);
    } 

    // get medicines of particular patient
    $query2 = "SELECT Medicines.mid, drugName, price FROM Medicines, Patient_Medicine 
               WHERE Medicines.mid = Patient_Medicine.mid AND Patient_Medicine.pid = ?;";
    if (mysqli_stmt_prepare($stmt, $query2)) {
        mysqli_stmt_bind_param($stmt, "s", $pid);
        mysqli_stmt_execute($stmt);
        $result2 = mysqli_stmt_get_result($stmt);
    } 
 
    // check whether row is inserted or not
    if ($result1) {
        $response["success"] = 1;
        $response["medicines"] = array();

        // check for empty result
        if (mysqli_num_rows($result2) > 0) {
            while ($row = mysqli_fetch_assoc($result2)) {
                array_push($response["medicines"], $row);
            }
        } else {
            $response["message"] = "No medicines found";
        }

        echo json_encode($response);
    } else {
        // failed to insert row
        $response["success"] = 0;
        $response["message"] = "Failed to add the row";
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
