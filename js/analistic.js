import { consultTable } from "./components/consultTable.js";
import { selectRegister } from "./components/selectRegister.js";
import { notification } from "./components/toast.js";
import { searchRegister } from "./register.js";

export function initAnalistic(travels){
	
	cleanWindowAnalistic()

	if(travels != null && travels.length == 0)
	{
		notification({
			title: "Sistema",
			body: "<b>Nenhum registro encontrado</b>",
			status : "error"
		});
		return 
	}

	if(travels != null && travels.length == 1){
		consultTable({records: calcValues(travels)})		
		return 
	}

	$('#collapse-simple').css({"display":"none"})
	selectRegister({travels: travels, input : 'consult-travels', id: 'analistic-travel'});	
}

export function generateTable(travel){
	consultTable({records: calcValues(travel)})		
}

function calcValues(travel){
	const records = JSON.parse(searchRegister())[travel]

	var values = [];
	var names = []
	var amountValues = 0 ;

	for(var interable = 0; interable < records.length; interable++){
		var value = records[interable]['value'];
		var name = records[interable]['name'];

		if(value != null){
			values.push(parseInt(value) * 100)
			names.push(name)
			amountValues += parseInt(value)
		}
	}

	const media = (amountValues / values.length) * 100
	var expenses = [];
	var expense = 0 ;	

	//console.log(`MEDIA ${(media / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }`)

	values.forEach(i =>{
		var debit = 0; 
		if(i < media){
			debit = ((media - i) / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
			expense = ({['owes'] : [{ debit }] } );
			expenses.push( expense)
			//console.log(` Gasto ${i / 100} ; ${JSON.stringify(expense).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} `)
			return
		}
		
		if(i > media){
			debit = ((i - media) / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
			expense = ({['receive'] : [{ debit }] } ) ;
			expenses.push(expense)
			//console.log(` Gasto ${i /100} ; ${JSON.stringify(expense).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} `)
			return
		}
	})

	return {
		"names" : names, 
		"expenses" : expenses,
		"values": values, 
		"media" : (media / 100).toLocaleString(
															'pt-BR',
															{ 
																style: 'currency', 
																currency: 'BRL' 
															}
														)
	};
}

function exportToOds(){}

function cleanWindowAnalistic(){
	const simpleAnalistic = document.getElementById('simpleAnalistic')
	const completeAnalistic = document.getElementById('completeAnalistic')

	simpleAnalistic.innerHTML = ""
	completeAnalistic.innerHTML = ""
	
	var element = document.getElementById('media-debits')
	if(element != null)
		element.remove();

	$("#collapse-complete").css({'display':'none'})
}
