import { saveRegister } from "./register.js"

$(document).ready(function(e){
});

$(document).on('click','#btn-save', function(){
	saveRegister(getRegiterData())	
});

function getRegiterData(){
	var name =$('#name').val()
	var date = $('#date').val()
	var value = $('#value').val()
	
	return [{ id: Math.random().toString(36), name : name, date: date, value: value }]
}
