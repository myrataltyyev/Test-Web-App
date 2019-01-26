// Check user's token for access
$.ajax({
    url: "http://localhost/phpmyadmin/TestProject/Main/CheckAccess.php",
    type: "GET",
    data: {token: localStorage.token},
    dataType: "json",
}).done(function (response) {
    console.log(response);
    if (response.success == 1) {
        if (response.isAdmin != "1" || response.dbName != "Hospital")
            $(document.body).html("<h1 style='text-align: center;'>Access denied!</h1>");
    } else {
        $(document.body).html("<h1 style='text-align: center;'>Access denied!</h1>");
    }
});

// Get List of Drugs
$(document).ready(function() {
    $.ajax({
        url: "http://localhost/phpmyadmin/TestProject/Hospital/GetListOfDrugs.php",
        dataType: "json",
    }).done(function (response) {
        console.log(response);
        if (response.message != "No medicines found")
            getListOfDrugs(response.medicines);
        else {
            $('#list_of_medicines').css({"height": "40px", "font-size": "22px"});
            $('#list_of_medicines').text("No Medicines found!");
        }
    });
});

// Search Drugs by Name
$('#search_btn').click(function() {
    var search_field = $('#search_field').val();
    
    $.ajax({
        url: "http://localhost/phpmyadmin/TestProject/Hospital/SearchDrugsByName.php",
        type: "GET",
        data: {drugName: search_field},
        dataType: "json",
    }).done(function (response) {
        console.log(response);
        if (response.message != "No medicines found")
            getListOfDrugs(response.medicines);
        else {
            $('#list_of_medicines').css({"height": "40px", "font-size": "22px"});
            $('#list_of_medicines').text("No Medicines found!");
        }
    });
});

// Add New Drug
$('#add_btn').click(function() {
    var drugname = $('#drugname_field').val();
    var price = $('#price_field').val();
    
    $('#drugname_field').val('');
    $('#price_field').val('0');
    
    // check for sql injection
    drugname.replace(/['"]+/g, '');
    price.replace(/['"]+/g, '');
    
    if (drugname === "")
        $('#drugname_field').css("border-color", "red");
    else if (price < 0) 
        $('#price_field').css("border-color", "red");
    else {
        $('#drugname_field').css("border-color", "grey");
        $('#price_field').css("border-color", "grey");
        
        $.ajax({
            url: "http://localhost/phpmyadmin/TestProject/Hospital/AddNewDrug.php",
            type: "POST",
            data: {drugname: drugname, price: price},
            dataType: "json",
        }).done(function (response) {
            console.log(response);
            getListOfDrugs(response.medicines);
        });
    }
});

// Delete the drug
$('#list_of_medicines').on('click', '.delete_btn', function() {
    var mid = $(this).parent().parent().attr('id');
    
    $.ajax({
        url: "http://localhost/phpmyadmin/TestProject/Hospital/DeleteDrug.php",
        type: "GET",
        data: {mid: mid},
        dataType: "json",
    }).done(function (response) {
        console.log(response);
        if (response.message != "No medicines found")
            getListOfDrugs(response.medicines);
        else {
            $('#list_of_medicines').css({"height": "40px", "font-size": "22px"});
            $('#list_of_medicines').text("No Medicines found!");
        }
    });
});

// Edit the drug
$('#list_of_medicines').on('click', '.edit_btn', function() {
    var hidden_box = $(this).parent().siblings('.hidden_box');
    hidden_box.show();
    
    var input_name = hidden_box.find('.input_name');
    var input_price = hidden_box.find('.input_price');
    
    var text_name = $(this).parent().siblings('.left_box').find('.text_name').text();
    var text_price = $(this).parent().siblings('.left_box').find('.text_price').text().substr(1);
    
    input_name.val(text_name);
    input_price.val(text_price);
});

// Update the drug
$('#list_of_medicines').on('click', '.update_btn', function() {
    var drugname = $(this).parent().find('.input_name').val();
    var price = $(this).parent().find('.input_price').val();
    var mid = $(this).parent().parent().attr('id');
    
    // check for sql injection
    drugname.replace(/['"]+/g, '');
    price.replace(/['"]+/g, '');
    
    if (drugname === "")
        $(this).parent().find('.input_name').css("border-color", "red");
    else if (price <= 0) 
        $(this).parent().find('.input_price').css("border-color", "red");
    else {
        $(this).parent().find('.input_name').css("border-color", "grey");
        $(this).parent().find('.input_price').css("border-color", "grey");
        
        $.ajax({
            url: "http://localhost/phpmyadmin/TestProject/Hospital/EditDrug.php",
            type: "POST",
            data: {drugname: drugname, price: price, mid: mid},
            dataType: "json",
        }).done(function (response) {
            console.log(response);
            getListOfDrugs(response.medicines);
        });
    }
});

// Cancel the update
$('#list_of_medicines').on('click', '.cancel_btn', function() {
    $(this).parent().hide();
});


function getListOfDrugs(medicines) {
    // clear place before output
    $('#list_of_medicines').empty();
    $('#list_of_medicines').css({"height": "auto", "max-height": "300px", "overflow": "auto"});
    
    // for each   
    for(var i = 0; i < medicines.length; i++){
        // create elements
        var div_outer = document.createElement("div");
        var div_upper = document.createElement("div");
        var div_left = document.createElement("div");
        var div_right = document.createElement("div");
        
        var input_name = document.createElement("input");
        var input_price = document.createElement("input");
        
        var p1 = document.createElement("p");
        var p2 = document.createElement("p");
        
        var update = document.createElement("button");
        var cancel = document.createElement("button");
        var edit = document.createElement("button");
        var del = document.createElement("button");

        // set titles and attributes
        div_outer.setAttribute("id", medicines[i].mid);
        div_upper.setAttribute("class", "hidden_box");
        div_left.setAttribute("class", "left_box");
        
        p1.innerHTML = medicines[i].drugName;
        p1.setAttribute("class", "text_name");
        
        p2.innerHTML = "$" + medicines[i].price;
        p2.setAttribute("class", "text_price");
        
        input_name.innerHTML = medicines[i].drugName;
        input_name.setAttribute("class", "input_name");
        
        input_price.innerHTML = medicines[i].price;
        input_price.setAttribute("class", "input_price");
        
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
        div_upper.appendChild(input_price);
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
        var style_div_left = "width: 60%; float: left; margin-left: 15px;";
        var style_div_right = "width: 20%; float: right; margin-right: 15px; margin-top: 12px";
        var style_input_name = "width: 53%; margin-right: 10px; margin-left: 10px;";
        var style_input_price = "width: 13%; margin-right: 10px";
        var style_p1 = "font-size: 20px; font-weight: bold; margin: 5px;";
        var style_p2 = "font-size: 18px; margin: 5px;";
        var style_btns = "font-size: 16px; margin: 5px; border-radius: 6px; cursor: pointer;";

        // apply styles
        div_outer.setAttribute("style", style_div_outer);
        div_upper.setAttribute("style", style_div_upper);
        div_left.setAttribute("style", style_div_left);
        div_right.setAttribute("style", style_div_right);
        
        p1.setAttribute("style", style_p1);
        p2.setAttribute("style", style_p2);
        
        input_name.setAttribute("style", style_input_name);
        input_price.setAttribute("style", style_input_price);
        
        update.setAttribute("style", style_btns);
        cancel.setAttribute("style", style_btns);
        edit.setAttribute("style", style_btns);
        del.setAttribute("style", style_btns);

        // add everything to html page
        $('#list_of_medicines').append(div_outer);
    }
}


