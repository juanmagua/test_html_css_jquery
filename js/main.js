var currentWidget;

var $username = localStorage.getItem("username");

var $courses = ["JavaScript", "PHP", "JAVA", "C++"];

var $subscribers = [{"firstname": "Juan Manuel", lastname: "Guadalupe", "course": "PHP"}];


$(document).ready(function () {

    init();
	
	$.each($courses, function(key, value) {   
		$('#course').append($("<option></option>").attr("value",value).text(value)); 
	});

    $('#btn-signup').click(function () {
        if($('#firstname, #lastname').val() != '' && $("#course option:selected" ).length > 0){
			signup();
            return false;
        }
        
		notify('error', "First Name, Last Name and Course is required");
		
		return false;
    });

    $('#btn-logout').click(function () {
        logout();
        return false;
    });



});


function init() {
		
	cleanForm();
	
	$(".container").show("slow");
	
	console.log($username);
        
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
    
	var subscriber = formToJSON();
	
	$subscribers.push(subscriber);
	
	console.log($subscribers);
	
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

    $('#subscribers').html('');
	
	$('#subscribers').hide();

    if ($subscribers.length > 0) {
        var $html = '<div class="row bg-row">' + 
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

        $('#subscribers').html($html);

        $('#subscribers').show("slow");

    }
}

function cleanForm() {
    $('#firstname, #lastname, #course').val('');
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
