import { notification } from "./toast.js"

/** Componente do tipo select
* @param array travels
* @param bool leftRegister
* @param string input
* @param string id
* @return null
**/

export function selectRegister({
	travels = null,
	leftRegister = false,
	input = 'travel-input',
	id = 'travel'
} = {}){

	const inputTravel = document.getElementById(input);

	if(travels == undefined || travels === null || travels.length == 0 ){

		if(travels != null && travels.length == 0){
			notification({
				title: "Sistema",
				body:'Nenhuma cobrança existente, crie uma nova.',
				status: 'warning'
			})
			leftRegister = true
		}

		inputTravel.innerHTML = '<input id="travel" type="text" class="form-control mb-5" placeholder="Viagem">'
		return
	}

	let items = '';

	travels.forEach((i, index, arr) => {

		if (index === arr.length - 1 && leftRegister == true) {
			items += `<option selected value="${i.trim()}">${i}</option>`
			return
		}

		if(leftRegister != Boolean && leftRegister == i){
			items += `<option selected value="${i.trim()}">${i}</option>`
			return
		}

		items += `<option value="${i.trim()}">${i}</option>`

		if (index === arr.length - 1 && leftRegister == false) {
			items += `<option selected value="default">Selecione</option>`
			return
		}

	})

	inputTravel.innerHTML =
		`<select id="${id}" class="form-select" aria-label="Default select example">` +
		`${items}`+
	'</select>'
}
