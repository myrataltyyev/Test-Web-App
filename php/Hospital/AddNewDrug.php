<?php
require "config.php";

header("Access-Control-Allow-Origin: *");

// array for JSON response
$response = array();
 
// check for required fields
if (isset($_POST['drugname']) && isset($_POST['price'])) {
    $drugName = $_POST['drugname'];
    $price = $_POST['price'];
 
    // inserting a new row with prepared statement
    $query1 = "INSERT INTO Medicines(drugName, price) VALUES(?, ?);";
    $stmt = mysqli_stmt_init($con);
    if (mysqli_stmt_prepare($stmt, $query1)) {
        mysqli_stmt_bind_param($stmt, "ss", $drugName, $price);
        $result1 = mysqli_stmt_execute($stmt);
    } 

    // get all medicines from Medicines table
    $query2 = "SELECT * FROM Medicines;";
    $result2 = mysqli_query($con, $query2);
 
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
            $response["medicines"] = "No medicines found";
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
