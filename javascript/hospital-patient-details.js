// Check user's token for access
$.ajax({
    url: "http://localhost/phpmyadmin/TestProject/Main/CheckAccess.php",
    type: "GET",
    data: {token: localStorage.token},
    dataType: "json",
}).done(function (response) {
    console.log(response);
    if (response.success == 1) {
        if (response.isAdmin != "0" || response.dbName != "Hospital")
            $(document.body).html("<h1 style='text-align: center;'>Access denied!</h1>");
    } else {
        $(document.body).html("<h1 style='text-align: center;'>Access denied!</h1>");
    }
});

// Global variable patient id
var pid;

// Get Patient details and medicines
$(document).ready(function() {
    pid = sessionStorage.getItem('pid');
    
    // Get patient details
    $.ajax({
        url: "http://localhost/phpmyadmin/TestProject/Hospital/GetPatientDetails.php",
        type: "GET",
        data: {pid: pid},
        dataType: "json",
    }).done(function (response) {
        console.log(response);
        var name = response.name.split(' ');
        var bio = response.bio;
        
        if (name.length > 0) {
            $('#first_name').text(name[0]);
            $('#last_name').text(name[1]);
        } else 
            $('#first_name').text(response.name);
        $('#biography').text(bio);
    });
    
    // Get all drugs
    $.ajax({
        url: "http://localhost/phpmyadmin/TestProject/Hospital/GetListOfDrugs.php",
        dataType: "json",
    }).done(function (response) {
        console.log(response);
        if (response.message != "No medicines found")
            getListOfDrugs(response.medicines, '#list_of_medicines');
        else {
            $('#list_of_medicines').css({"height": "40px", "font-size": "22px"});
            $('#list_of_medicines').text("No Medicines found!");
        }
    });
    
    // Get patient drugs
    $.ajax({
        url: "http://localhost/phpmyadmin/TestProject/Hospital/GetPatientDrugs.php",
        type: "GET",
        data: {pid: pid},
        dataType: "json",
    }).done(function (response) {
        console.log(response);
        if (response.message != "No medicines found")
            getListOfDrugs(response.medicines, '#patient_medicines');
        else {
            $('#patient_medicines').css({"height": "40px", "font-size": "22px"});
            $('#patient_medicines').text("No Medicines found for this Patient!");
        }
    });
});

// Add drug to the patient's list
$('#list_of_medicines').on('click', '.add_btn', function() {
    var mid = $(this).parent().parent().attr('id');
    
    $.ajax({
        url: "http://localhost/phpmyadmin/TestProject/Hospital/AddDrugToPatient.php",
        type: "GET",
        data: {mid: mid, pid: pid},
        dataType: "json",
    }).done(function (response) {
        console.log(response);
        getListOfDrugs(response.medicines, '#patient_medicines');
    });
});

// Delete the drug from patient's list
$('#patient_medicines').on('click', '.delete_btn', function() {
    var mid = $(this).parent().parent().attr('id');
    
    $.ajax({
        url: "http://localhost/phpmyadmin/TestProject/Hospital/DeletePatientDrug.php",
        type: "GET",
        data: {mid: mid, pid: pid},
        dataType: "json",
    }).done(function (response) {
        console.log(response);
        if (response.message != "No medicines found")
            getListOfDrugs(response.medicines, '#patient_medicines');
        else {
            $('#patient_medicines').css({"height": "40px", "font-size": "22px"});
            $('#patient_medicines').text("No Medicines found for this Patient!");
        }
    });
});


function getListOfDrugs(medicines, id) {
    // clear place before output
    $(id).empty();
    $(id).css({"height": "auto", "max-height": "400px", "overflow": "auto"});
    
    // for each   
    for(var i = 0; i < medicines.length; i++){
        // create elements
        var div_outer = document.createElement("div");
        var div_left = document.createElement("div");
        var div_right = document.createElement("div");
        
        var p1 = document.createElement("p");
        var p2 = document.createElement("p");
        
        // set titles and attributes
        div_outer.setAttribute("id", medicines[i].mid);
        div_left.setAttribute("class", "left_box");
        
        p1.innerHTML = medicines[i].drugName;
        p1.setAttribute("class", "text_name");
        
        p2.innerHTML = "$" + medicines[i].price;
        p2.setAttribute("class", "text_price");
        
        // add elements
        div_left.appendChild(p1);
        div_left.appendChild(p2);
        
        div_outer.appendChild(div_left);
        div_outer.appendChild(div_right);

        // create style for each element
        var style_div_outer = "overflow: hidden; width: auto; height: auto; padding: 10px; border: 2px solid grey; margin: 5px 0px; vertical-align: middle;";
        var style_div_left = "width: 70%; float: left; margin-left: 15px;";
        var style_div_right = "width: 13%; float: right; margin-right: 10px; margin-top: 12px";
        var style_p1 = "font-size: 20px; font-weight: bold; margin: 5px;";
        var style_p2 = "font-size: 18px; margin: 5px;";
        var style_btn = "font-size: 16px; margin: 5px; border-radius: 6px; cursor: pointer;";

        // apply styles
        div_outer.setAttribute("style", style_div_outer);
        div_left.setAttribute("style", style_div_left);
        div_right.setAttribute("style", style_div_right);
        
        p1.setAttribute("style", style_p1);
        p2.setAttribute("style", style_p2);
        
        // Set button according to id
        if (id == '#patient_medicines') {
            var del = document.createElement("button");
            del.innerHTML = "Delete";
            del.setAttribute("class", "delete_btn");
            div_right.appendChild(del);
            del.setAttribute("style", style_btn);
        } else {
            var add = document.createElement("button");
            add.innerHTML = "Add";
            add.setAttribute("class", "add_btn");
            div_right.appendChild(add);
            add.setAttribute("style", style_btn);
        }

        // add everything to html page
        $(id).append(div_outer);
    }
}
