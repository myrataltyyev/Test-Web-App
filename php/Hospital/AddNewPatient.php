<?php
require "config.php";

header("Access-Control-Allow-Origin: *");

// array for JSON response
$response = array();
 
// check for required fields
if (isset($_POST['name']) && isset($_POST['bio'])) {
    $name = $_POST['name'];
    $bio = $_POST['bio'];
 
    // inserting a new row with prepared statement
    $query1 = "INSERT INTO Patients(name, bio) VALUES(?, ?);";
    $stmt = mysqli_stmt_init($con);
    if (mysqli_stmt_prepare($stmt, $query1)) {
        mysqli_stmt_bind_param($stmt, "ss", $name, $bio);
        $result1 = mysqli_stmt_execute($stmt);
    } 

    // get all patients from Patients table
    $query2 = "SELECT * FROM Patients;";
    $result2 = mysqli_query($con, $query2);
 
    // check whether row is inserted or not
    if ($result1) {
        $response["success"] = 1;
        $response["patients"] = array();

        // check for empty result
        if (mysqli_num_rows($result2) > 0) {
            while ($row = mysqli_fetch_assoc($result2)) {
                array_push($response["patients"], $row);
            }
        } else {
            $response["patients"] = "No patients found";
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
