import {notification} from "./components/toast.js"

/**
* Sava um novo registro
* @param array register
* @return void
**/
const db = 'book_of_travels';
export function saveRegister(register){
  let register_finded = searchRegister()

  if( register_finded === null || register_finded == []){
    localStorage.setItem(db ,JSON.stringify(register));
    return
  }

  register_finded = JSON.parse(register_finded);

  const travels = Object.keys(register_finded)
  const travel = Object.keys(register).toString();

  if(travels.includes(travel))
    register_finded[travel] = register_finded[travel].concat(register[travel])
  else
    register_finded[travel] = register[travel]

  localStorage.setItem(db ,JSON.stringify(register_finded));

	notification({
		title: 'Sistema',
		body: 'Despesa registrada!.',
		status: "success"
	});
}

/**
* Busca um registro expecifico
* @param string value_search
* @return array
**/
export function searchRegister(value_search = db){
	const result = localStorage.getItem(value_search)

	if(result == null)
		return '{}'

	return result
}


/**
* Deleta registros
* @param string id
**/
export function deleteRegister(id){

}

/** Exporta um viagem para ods **/
export function exportRegister(){}


/**
 * Valida todos os campos de registro de despesas
 * @param string name
 * @param string value
 * @param string date
 * @param string travel
 * @return bool|void
 * **/
export function inputValidator({name, value, date, travel}){

	let onlyNumberAndLattersAndSpecificSymbols = /^[a-zA-ZÀ-ú0-9 ]{2,}$/;
	let regexDate = /^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
	let regexNumberAndSpecifSymbol = /^[0-9,.]*$/;

	try{

		notificationTest(
			'Nome ou apelido contém caracteres não permitidos.',
			onlyNumberAndLattersAndSpecificSymbols.test(name)
		);

		notificationTest(
			'Data está inválida.',
			regexDate.test(date)
		)

		 notificationTest(
			'Valor está inválido.',
			regexNumberAndSpecifSymbol.test(value)
		)

		notificationTest(
			"Nome da viagem contém caracteres inválidos.",
			onlyNumberAndLattersAndSpecificSymbols.test(travel)
		)

	}catch(ex){
		return false
	}

	/** Envia uma notificação de erro de validação
	 * @param string body
	 * @param string resultTest
	 * **/
	function notificationTest(body ,resultTest){
		if(!resultTest){
			throw new Error(
				notification({
					title: "Sistema",
					body: body,
					status: "warning"
				})
			)
		}
	}
}
