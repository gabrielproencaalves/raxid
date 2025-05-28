import {notification} from "./components/toast.js"

export function saveRegister(register){
	let regiter_finded = searchRegister('book_of_debits')

	if( regiter_finded === null){	
		localStorage.setItem('book_of_debits',JSON.stringify(register));
		return 
	}

	register = JSON.parse(regiter_finded).concat(register)
	localStorage.setItem('book_of_debits',(JSON.stringify(register)));

	notification({
		title: 'Sistema', body: 'Usuário registrado!.'
	});
}

export function searchRegister(value_search){
	return localStorage.getItem(value_search)
}  

export function deleteRegister(id){
	
}

export function exportRegister(){}
