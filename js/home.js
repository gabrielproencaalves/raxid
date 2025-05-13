import fetchPage from "./components/fetchPage.js";

$(document).ready(function(e){
	
	const url = window.location.origin;

	$("#btn-register").on("click", function(e){
		e.preventDefault();
		window.location.replace(url + "/register");
	});

	$("#btn-consult").on("click", function(e){
		e.preventDefault();
		window.location.replace(url + "/analistic");
	});
});
