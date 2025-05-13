export default function fetchPage({
	file = null, 
	element = null
} = {}) {	
	if (!file || !element) {
		console.error("Parâmetros 'file' e 'element' são obrigatórios.");
		return;
	}
	return new Promise((resolve, reject) => {
		fetch(file)
			.then(res => {
       if (!res.ok) throw new Error(`Erro ${res.status}`);
       return res.text();
			})
			.then(html => {
				document.querySelector(element).innerHTML = html;
				resolve(); // tudo certo, resolvemos a Promise
			})
			.catch(err => {
				document.querySelector(element).innerHTML = "<h1>Erro ao carregar a página.</h1>";
				reject(err); // erro ao carregar
			});
  });
}
