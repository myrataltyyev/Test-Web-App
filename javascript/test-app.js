$('#login_btn').on('click', function() {
    var appType = $("input[name='app_type']:checked").val();
    var username = $("#username").val();
    var password = $("#password").val();
    
    if (appType && username && password) {
        $.ajax({
            url: "http://localhost/phpmyadmin/TestProject/Main/Login.php",
            type: "GET",
            dataType: "json",
            data: {
                username: username,
                password: password,
                dbName: appType
            }
        }).done(function(response) {
            console.log(response);
            if (response.success == 1) {
                localStorage.token = response.token;
                console.log(response.isAdmin + " " + appType);
                if (response.isAdmin == "1" && appType == "Drugstore"){
                    document.location.href = "drugstore-admin.html";
                } else if (response.isAdmin == "0" && appType == "Drugstore") {
                    document.location.href = "drugstore-user.html";
                } else if (response.isAdmin == "1" && appType == "Hospital") {
                    document.location.href = "hospital-admin.html";
                } else {
                    document.location.href = "hospital-patients.html";
                } 
            } else {
                alert("Failed to login. " + response.message);
                $('#username').css("border-color", "red");
                $('#password').css("border-color", "red");
            }
        });
    } else {
        alert("Please fill all fields and select one option");
    }
});


$('#register_btn').on('click', function() {
    var appType = $("input[name='app_type']:checked").val();
    var username = $("#username").val();
    var password = $("#password").val();
    
    if (appType && username && password) {
        $.ajax({
            url: "http://localhost/phpmyadmin/TestProject/Main/Register.php",
            type: "POST",
            dataType: "json",
            data: {
                username: username,
                password: password,
                dbName: appType
            }
        }).done(function(response) {
            console.log(response);
            if (response.success == 1) {
                confirm("Successfully registered");
            } else {
                confirm("Failed to register. " + response.message);
                $('#username').css("border-color", "red");
            }
        });
    } else {
        alert("Please fill all fields and select one option");
    }
});
