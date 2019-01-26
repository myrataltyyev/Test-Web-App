// Check user's token for access
$.ajax({
    url: "http://localhost/phpmyadmin/TestProject/Main/CheckAccess.php",
    type: "GET",
    data: {token: localStorage.token},
    dataType: "json",
}).done(function (response) {
    console.log(response);
    if (response.success == 1) {
        if (response.isAdmin != "0" || response.dbName != "Drugstore")
            $(document.body).html("<h1 style='text-align: center;'>Access denied!</h1>");
    } else {
        $(document.body).html("<h1 style='text-align: center;'>Access denied!</h1>");
    }
});

// Get List of Drugs
$(document).ready(function() {
    $.ajax({
        url: "http://localhost/phpmyadmin/TestProject/Drugstore/GetListOfDrugs.php",
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
        url: "http://localhost/phpmyadmin/TestProject/Drugstore/SearchDrugsByName.php",
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

// Buy the drug
$('#list_of_medicines').on('click', '.buy_btn', function() {
    var drugname = $(this).parent().siblings('.left_box').find('.text_name').text();
    var price = $(this).parent().siblings('.left_box').find('.text_price').text();
    
    window.confirm(drugname + " with " + price + " price has been added to your shopping cart");
});


function getListOfDrugs(medicines) {
    // clear place before output
    $('#list_of_medicines').empty();
    $('#list_of_medicines').css({"height": "auto", "max-height": "500px", "overflow": "auto"});
    
    // for each   
    for(var i = 0; i < medicines.length; i++){
        // create elements
        var div_outer = document.createElement("div");
        var div_left = document.createElement("div");
        var div_right = document.createElement("div");
        
        var input_name = document.createElement("input");
        var input_price = document.createElement("input");
        
        var p1 = document.createElement("p");
        var p2 = document.createElement("p");
        
        var buy = document.createElement("button");

        // set titles and attributes
        div_outer.setAttribute("id", medicines[i].mid);
        div_left.setAttribute("class", "left_box");
        
        p1.innerHTML = medicines[i].drugName;
        p1.setAttribute("class", "text_name");
        
        p2.innerHTML = "$" + medicines[i].price;
        p2.setAttribute("class", "text_price");
        
        buy.innerHTML = "Buy";
        buy.setAttribute("class", "buy_btn");
        
        // add elements
        div_left.appendChild(p1);
        div_left.appendChild(p2);
        
        div_right.appendChild(buy);
        
        div_outer.appendChild(div_left);
        div_outer.appendChild(div_right);

        // create style for each element
        var style_div_outer = "overflow: hidden; width: auto; height: auto; padding: 10px; border: 2px solid grey; margin: 5px 0px; vertical-align: middle;";
        var style_div_left = "width: 60%; float: left; margin-left: 15px;";
        var style_div_right = "width: 15%; float: right; margin-top: 12px";
        var style_p1 = "font-size: 20px; font-weight: bold; margin: 5px;";
        var style_p2 = "font-size: 18px; margin: 5px;";
        var style_btn = "font-size: 16px; margin: 5px; border-radius: 6px; cursor: pointer;";

        // apply styles
        div_outer.setAttribute("style", style_div_outer);
        div_left.setAttribute("style", style_div_left);
        div_right.setAttribute("style", style_div_right);
        
        p1.setAttribute("style", style_p1);
        p2.setAttribute("style", style_p2);
        
        buy.setAttribute("style", style_btn);

        // add everything to html page
        $('#list_of_medicines').append(div_outer);
    }
}



