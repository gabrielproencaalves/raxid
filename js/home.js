import { inputValidator, saveRegister, searchRegister } from "./register.js"
import { selectRegister } from "./components/selectRegister.js"

// ###### Registro ##########

/**
* Executa as operações de validação e persitência e 
* atualização do input de text para select. 
**/
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

/**Formata o texto no input #value em tempo real para R$. **/
$('#value').on('input', function() {	
	let input = $(this);
	let data = input.val().replace(/\D+/g, '');
  if (data.length > 14) data = data.slice(0, 14);
  input.val(
    data.replace(/(\d)(\d\d)$/, "$1,$2")
     .replace(/(^\d{1,3}|\d{3})(?=(?:\d{3})+(?:,|$))/g, '$1.')
	);
});

/**Carrega o input texto para registro de nova viagem. **/
$(document).on('click','#load-new-travel-form', function(e){
	e.preventDefault()
	getTravelsForSelect({leftRegister: true});		
});

/** Carrega o element selelect para registro de viagem pré existente. **/
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

// ======= END Registro =======

// ======= Functions ===========

//Obtém um input select ou text para manipulação das viagens 
function getTravelsForSelect({travels, leftRegister}){
	selectRegister({travels : travels, leftRegister: leftRegister});
}

//Obtém as viagems no localstorage
function selectTravels(){
	return Object.keys(JSON.parse(searchRegister('book_of_travels')))
}

// ======= END Functions ===========
