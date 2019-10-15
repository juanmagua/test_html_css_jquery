let $username = localStorage.getItem("username");

const $courses = ["JavaScript", "PHP", "JAVA", "C++"];

const $subscribers = [{"firstname": "Juan Manuel", lastname: "Guadalupe", "course": "PHP"}];

$(document).ready(function () {

    init();
    
    // Render Select
	$.each($courses, function(key, value) {   
		$('#course').append($("<option></option>").attr("value",value).text(value)); 
	});

    // Event Signup
    $('#btn-signup').click(function () {
        if($('#firstname, #lastname').val() != '' && $("#course option:selected" ).length > 0){
			signup();
            return false;
        }        
		notify('error', "First Name, Last Name and Course is required");
		return false;
    });

    // Event Logout
    $('#btn-logout').click(function () {
        logout();
        return false;
    });

});


function init() {
    $('#firstname, #lastname, #course').val('');
    $(".container").show("slow");	       
    
    if ($username !== 'undefined' && $username !== null) {
        $("#dashboard").show();
        $("#login").hide();
        $(".blog-header-logo").html("Hey," + $username);
        renderList();
    } else {
        $("#login").show();
        $("#dashboard").hide();
    }
    	
	return false;
}

function signup() {
	let subscriber = formToJSON();
	$subscribers.push(subscriber);
	localStorage.setItem("username", subscriber.firstname + " " + subscriber.lastname);
	$username = localStorage.getItem("username");
	init();
}

function logout() {
    localStorage.clear();
    $("#login").show();
    $("#dashboard").hide();
    notify('', "Good Bye!!");
}


function renderList() {
    $('#subscribers').html('').hide();
	
    if ($subscribers.length > 0) {

        let  $html = '<div class="row bg-row">' + 
					'<div class="col-4">FistName</div>' +
					'<div class="col-4">LastName</div>' +
					'<div class="col-4">Course</div>' +
					 '</div>';
					 
        $.each($subscribers, function (index, subscriber) {
            $html = $html + '<div class="row subscriber">' +
						  	'<div class="col-4">'+ subscriber.firstname +'</div>' +
							'<div class="col-4">'+ subscriber.lastname +'</div>' +
							'<div class="col-4">'+ subscriber.course +'</div>' +
							'</div>';

        });

        $('#subscribers').html($html).show("slow");
    }
}

function formToJSON() {
    return {
        "firstname": $('#firstname').val(),
        "lastname": $('#lastname').val(),
		"course": $('#course').val(),
    };
}


function notify($levelMessage, $message) {
    runNotify({
        type: 'notify',
        message: $message,
        levelMessage: $levelMessage
    });
}
