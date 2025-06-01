import { inputValidator, saveRegister, searchRegister } from "./register.js"
import { selectRegister } from "./components/selectRegister.js"

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

	getTravelsForSelect({travels: selectTravels({}), leftRegister : travel});
});

$('#value').on('input', function() {	
	let input = $(this);
	let data = input.val().replace(/\D+/g, '');
  if (data.length > 14) data = data.slice(0, 14);
  input.val(
    data.replace(/(\d)(\d\d)$/, "$1,$2")
     .replace(/(^\d{1,3}|\d{3})(?=(?:\d{3})+(?:,|$))/g, '$1.')
	);
});

$(document).on('click','#load-new-travel-form', function(e){
	e.preventDefault()
	getTravelsForSelect({leftRegister: true});		
});

$(document).on('click','#load-exist-travel-form', function(e){
	e.preventDefault()
	getTravelsForSelect({travels: selectTravels()});	
});

/** 
* Cria o objeto a partir dos dados inseridos no form
* @return array
**/
function getRegiterData(){
	var name =$('#name').val()
	var date = $('#date').val()
	var value = $('#value').val().replace(/[^0-9]/g, '')
	var travel = $('#travel').val()
	
	return  { [ travel] : [{id: Math.random().toString(36), name : name, date: date, value: value  },] }
}

//Obtém um input select ou text para manipulação das viagens 
function getTravelsForSelect({travels, leftRegister}){
	selectRegister({travels : travels, leftRegister: leftRegister});
}

//Obtém as viagems no localstorage
function selectTravels(){
	return Object.keys(JSON.parse(searchRegister('book_of_travels')))
}
