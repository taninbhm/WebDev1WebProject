
function hide_errors() {
	var errors = document.getElementsByClassName("contact-error");
	for(var i=0; i<errors.length ; i++)
	{
		errors[i].style.display = "none";
	}
}

function trim(str) 
{
	return str.replace(/^\s+|\s+$/g,"");
}

function validate(e)
{
	hide_errors();

	if(catchErrors()){

		e.preventDefault();
		return false;
	}

	return true;
}

function reset(e) {

	if(confirm('Do you want to clear the form?')) {

		hide_errors();
		return true;
	}

	e.preventDefault();
	return false;
}

function clear() {

	var fields = ["firstname","lastname", "email", "phone", "city", "message"];
	for (var i = 0; i < fields.length; i++)
	{
		var field = document.getElementById(fields[i]);
		field.value = "";
	}
}

function catchErrors()
{
	var errorFlag = false;

	var required = ["firstname","lastname", "email", "phone", "city"];

	var province = document.getElementById("province");

	var email = document.getElementById("email");

	var phone = document.getElementById("phone");

	var validEmail = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);

	var validPhone = new RegExp(/^\d{3}-\d{3}-\d{4}$/);

	for (var i = 0; i < required.length; i++) {

		var field = document.getElementById(required[i]);

		if(!(field.value && trim(field.value))) {

			var error = document.getElementById(required[i]+"_error");

			error.style.display = "block";


			errorFlag = true;
		}
	}

	if(province.selectedIndex == "")
	{
		document.getElementById("province_error").style.display = "block";
		errorFlag = true;
	}

	if(email.value && trim(email.value) && !(validEmail.test(email.value)))
	{
		document.getElementById("emailformat_error").style.display = "block";
		errorFlag = true;
	}

	if(phone.value && trim(phone.value) && (phone.value).length >10 || phone.value && trim(phone.value) && (isNaN(phone.value)))
	{
		document.getElementById("phoneformat_error").style.display = "block";
	}

	return errorFlag;
}

function load() {

	hide_errors();
	clear();
	document.getElementById("contact-form").addEventListener("reset", reset);

	document.getElementById("contact-form").addEventListener("submit", validate);
}

document.addEventListener("DOMContentLoaded", load);