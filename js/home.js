import { inputValidator, saveRegister, searchRegister } from "./register.js"

$(document).ready(function(e){
	searchRegister()
});

$(document).on('click','#btn-save', function(){
	const values = getRegiterData();
	const travel = Object.keys(values).toString()

	const pipeValid = inputValidator({
		name: values[travel][0]['name'],
		value: values[travel][0]['value'],
		date: values[travel][0]['date'], 
		travel: travel
	});

	if(pipeValid === false)
		return

	saveRegister(values)	
});

/** 
* Cria o objeto a partir dos dados inseridos no form
* @return array
**/
function getRegiterData(){
	var name =$('#name').val()
	var date = $('#date').val()
	var value = $('#value').val()
	var travel = $('#travel').val()
	
	return  { [ travel] : [{id: Math.random().toString(36), name : name, date: date, value: value  },] }
}
