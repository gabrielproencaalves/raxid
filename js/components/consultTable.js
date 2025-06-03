import { notification } from "./toast.js"

export function consultTable({
	records = {}
} = {}){

	if (records == ''  || records == null){
		notification({
			title: "Sistema",
			body: "Não foi possível criar analize !!.",
			status: "error"
		});
		return
	}

	if (records['expenses'].length == 0){
		notification({
			title: "Sistema",
			body: "Todos os pagantes deste rateio já estão quites",
			status: "success"
		});
		return
	}

	var bodySimpleAnalistic = '';
	var bodyCompleteAnalistic = '';
	var owes = '';
	var reciver = '';

	var media = `<td class="media">${ records['media']}</td>`;
	//console.log(records['expenses'][0].hasOwnProperty('reciver'))

	for(var interable = 0; interable < records['expenses'].length; interable++){

		if(records['expenses'][interable].hasOwnProperty('owes')){
			owes = `<td class="text-danger" >${records['expenses'][interable]['owes'][0]['debit']}</td>`;
			//reciver = `<td>R$ 0</td>`;
			reciver = `<td> </td>`;
		}

		if(records['expenses'][interable].hasOwnProperty('receive')){
			reciver = `<td class="text-success">${records['expenses'][interable]['receive'][0]['debit']}</td>`
			//owes = `<td>R$ 0</td>`;
			owes = `<td> </td>`;
		}

		var name = `<td>${records['names'][interable].trim()}</td>`;
		var debit = `<td>${(records['values'][interable]/ 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>`

		bodySimpleAnalistic +=
			`<tr>`	+
				`${name}` +
				`${owes}`+
				`${reciver}`+
			`</tr>`
		;

		bodyCompleteAnalistic +=
			`<tr>`	+
				`${name}` +
				`${media}` +
				`${debit}` +
				`${owes}`+
				`${reciver}`+
			`</tr>`
		;
	}

	const tableSimpleAnalistic =
	`	<thead class="thead-dark">									`+
	` 	  <tr>																		`+
	` 	    <th scope="col">Viajante</th>					`+
	` 	    <th scope="col">Devendo</th>        	`+
	` 	    <th scope="col">Recebendo</th>      	`+
	` 	  </tr>																		`+
	` 	</thead>																	`+
	` 	<tbody>																	  `+
	`			${bodySimpleAnalistic}                  `+
	` 	</tbody>																	`;

	const tableCompleteAnalistic =
		`<thead class="thead-dark">`+
  	`  <tr>`+
  	`    <th scope="col">Viajante</th>`+
  	`    <th scope="col" class="media">Média</th>`+
  	`    <th scope="col">Gasto</th>`+
		`		 <th scope="col">Devendo</th>`+
  	`		<th scope="col">Recebendo</th>`+
  	`  </tr>`+
  	`</thead>`+
		`<tbody>`+
		`	${bodyCompleteAnalistic}`+
		`</tbody>`;

	const simpleAnalistic = document.getElementById('simpleAnalistic')
	simpleAnalistic.innerHTML = tableSimpleAnalistic

	const completeAnalistic = document.getElementById('completeAnalistic')
	completeAnalistic.innerHTML = tableCompleteAnalistic
}
