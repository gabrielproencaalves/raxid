export function notification({
	title, body
} = {}){

	const toast = '<div class="toast-header">' +
	  `<strong class="me-auto">${title}</strong>` +
	  '<button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>' +
	'</div>' +
	'<div class="toast-body">'+
	  `${body}`+
	'</div>' 

	const liveToast = document.getElementById('liveToast');
	liveToast.innerHTML = toast

	const toastBootstrap = bootstrap.Toast.getOrCreateInstance(liveToast);
	toastBootstrap.show();

}
