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

// Get List of Patients
$(document).ready(function() {
    $.ajax({
        url: "http://localhost/phpmyadmin/TestProject/Hospital/GetListOfPatients.php",
        dataType: "json",
    }).done(function (response) {
        console.log(response);
        if (response.message != "No patients found")
            getListOfPatients(response.patients);
        else {
            $('#list_of_patients').css({"height": "40px", "font-size": "22px"});
            $('#list_of_patients').text("No Patients found!");
        }
    });
});

// Search Patients by Name
$('#search_btn').click(function() {
    var search_field = $('#search_field').val();
    
    $.ajax({
        url: "http://localhost/phpmyadmin/TestProject/Hospital/SearchPatientsByName.php",
        type: "GET",
        data: {name: search_field},
        dataType: "json",
    }).done(function (response) {
        console.log(response);
        if (response.message != "No patients found")
            getListOfPatients(response.patients);
        else {
            $('#list_of_patients').css({"height": "40px", "font-size": "22px"});
            $('#list_of_patients').text("No Patients found!");
        }
    });
});

// Add New Patient
$('#add_btn').click(function() {
    var name = $('#patient_name_field').val();
    var bio = $('#patient_bio').val();
    
    $('#patient_name_field').val('');
    $('#patient_bio').val('');
    
    if (name === "")
        $('#patient_name_field').css("border-color", "red");
    else if (bio === "") 
        $('#patient_bio').css("border-color", "red");
    else {
        $('#patient_name_field').css("border-color", "grey");
        $('#patient_bio').css("border-color", "grey");
        
        $.ajax({
            url: "http://localhost/phpmyadmin/TestProject/Hospital/AddNewPatient.php",
            type: "POST",
            data: {name: name, bio: bio},
            dataType: "json",
        }).done(function (response) {
            console.log(response);
            getListOfPatients(response.patients);
        });
    }
});

// Delete the Patient
$('#list_of_patients').on('click', '.delete_btn', function() {
    var pid = $(this).parent().parent().attr('id');
    
    $.ajax({
        url: "http://localhost/phpmyadmin/TestProject/Hospital/DeletePatient.php",
        type: "GET",
        data: {pid: pid},
        dataType: "json",
    }).done(function (response) {
        console.log(response);
        if (response.message != "No patients found")
            getListOfPatients(response.patients);
        else {
            $('#list_of_patients').css({"height": "40px", "font-size": "22px"});
            $('#list_of_patients').text("No Patients found!");
        }
    });
});

// Edit the Patient
$('#list_of_patients').on('click', '.edit_btn', function() {
    var hidden_box = $(this).parent().siblings('.hidden_box');
    hidden_box.show();
    
    var input_name = hidden_box.find('.input_name');
    var input_bio = hidden_box.find('.input_bio');
    
    var text_name = $(this).parent().siblings('.left_box').find('.text_name').text();
    var text_bio = $(this).parent().siblings('.left_box').find('.text_bio').text();
    
    input_name.val(text_name);
    input_bio.val(text_bio);
});

// Update the Patient
$('#list_of_patients').on('click', '.update_btn', function() {
    var name = $(this).parent().find('.input_name').val();
    var bio = $(this).parent().find('.input_bio').val();
    var pid = $(this).parent().parent().attr('id');
    
    if (name === "")
        $(this).parent().find('.input_name').css("border-color", "red");
    else if (bio === "") 
        $(this).parent().find('.input_bio').css("border-color", "red");
    else {
        
        $.ajax({
            url: "http://localhost/phpmyadmin/TestProject/Hospital/EditPatient.php",
            type: "POST",
            data: {name: name, bio: bio, pid: pid},
            dataType: "json",
        }).done(function (response) {
            console.log(response);
            getListOfPatients(response.patients);
        });
    }
});

// Cancel the update
$('#list_of_patients').on('click', '.cancel_btn', function() {
    $(this).parent().hide();
});

// Go to patient details page
$('#list_of_patients').on('click', '.text_name, .text_bio', function() {
    var pid = $(this).parent().parent().attr('id');
    document.location.href = "hospital-patient-details.html";
    sessionStorage.setItem('pid', pid);
});


function getListOfPatients(patients) {
    // clear place before output
    $('#list_of_patients').empty();
    $('#list_of_patients').css({"height": "auto", "max-height": "300px", "overflow": "auto"});
    
    // for each   
    for(var i = 0; i < patients.length; i++){
        // create elements
        var div_outer = document.createElement("div");
        var div_upper = document.createElement("div");
        var div_left = document.createElement("div");
        var div_right = document.createElement("div");
        
        var input_name = document.createElement("input");
        var input_bio = document.createElement("input");
        
        var p1 = document.createElement("p");
        var p2 = document.createElement("p");
        
        var update = document.createElement("button");
        var cancel = document.createElement("button");
        var edit = document.createElement("button");
        var del = document.createElement("button");

        // set titles and attributes
        div_outer.setAttribute("id", patients[i].pid);
        div_upper.setAttribute("class", "hidden_box");
        div_left.setAttribute("class", "left_box");
        
        p1.innerHTML = patients[i].name;
        p1.setAttribute("class", "text_name");
        
        p2.innerHTML = patients[i].bio;
        p2.setAttribute("class", "text_bio");
        
        input_name.innerHTML = patients[i].name;
        input_name.setAttribute("class", "input_name");
        
        input_bio.innerHTML = patients[i].bio;
        input_bio.setAttribute("class", "input_bio");
        
        update.innerHTML = "Update";
        update.setAttribute("class", "update_btn");
        
        cancel.innerHTML = "Cancel";
        cancel.setAttribute("class", "cancel_btn");
        
        edit.innerHTML = "Edit";
        edit.setAttribute("class", "edit_btn");
        
        del.innerHTML = "Delete";
        del.setAttribute("class", "delete_btn");
        
        // add elements
        div_upper.appendChild(input_name);
        div_upper.appendChild(input_bio);
        div_upper.appendChild(update);
        div_upper.appendChild(cancel);
        
        div_left.appendChild(p1);
        div_left.appendChild(p2);
        
        div_right.appendChild(edit);
        div_right.appendChild(del);
        
        div_outer.appendChild(div_upper);
        div_outer.appendChild(div_left);
        div_outer.appendChild(div_right);

        // create style for each element
        var style_div_outer = "overflow: hidden; width: auto; height: auto; padding: 10px; border: 2px solid grey; margin: 5px 0px; vertical-align: middle;";
        var style_div_upper = "width: 100%; height: 40px; margin: 5px; display: none;";
        var style_div_left = "width: 75%; float: left; margin-left: 15px;";
        var style_div_right = "width: 20%; float: right; margin-right: 15px; margin-top: 12px";
        var style_input_name = "width: 30%; margin-right: 10px; margin-left: 10px;";
        var style_input_bio = "width: 36%; margin-right: 10px";
        var style_p1 = "font-size: 20px; font-weight: bold; margin: 5px; cursor: pointer;";
        var style_p2 = "font-size: 18px; margin: 5px; cursor: pointer;";
        var style_btns = "font-size: 16px; margin: 5px; border-radius: 6px; cursor: pointer";

        // apply styles
        div_outer.setAttribute("style", style_div_outer);
        div_upper.setAttribute("style", style_div_upper);
        div_left.setAttribute("style", style_div_left);
        div_right.setAttribute("style", style_div_right);
        
        p1.setAttribute("style", style_p1);
        p2.setAttribute("style", style_p2);
        
        input_name.setAttribute("style", style_input_name);
        input_bio.setAttribute("style", style_input_bio);
        
        update.setAttribute("style", style_btns);
        cancel.setAttribute("style", style_btns);
        edit.setAttribute("style", style_btns);
        del.setAttribute("style", style_btns);

        // add everything to html page
        $('#list_of_patients').append(div_outer);
    }
}


