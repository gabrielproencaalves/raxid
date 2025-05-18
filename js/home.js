import router from "./router.js";

$(document).ready(function(e){
	
	const url = window.location.origin;

	$("#btn-register").on("click", function(e){
		e.preventDefault();
		router('/register')
	});

	$("#btn-consult").on("click", function(e){
		e.preventDefault();
		window.location.replace(url + "/analistic");
	});
});
