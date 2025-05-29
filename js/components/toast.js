/** 
* Cria um componente visual para notificacao em tela 
* @param string title
* @param string body
**/
export function notification({
	title, body,status = 'default'
} = {}){
	
	const notificationStatus = {
		error: {
			background : "bg-dark",
			foreground : "text-danger",
			title : "text-light",
			close : "btn-close-white"
		},
		warning: {
			background : "bg-dark",
			foreground : "text-warning",
			title : "text-light",
			close : "btn-close-white"
		},
		success: {
			background : "bg-white",
			foreground : "text-success",
			title : "text-dark",
			close : "btn-close"
		},
		default: {
			background : "bg-white",
			foreground : "text-dark",
			title : "text-dark",
			close : "btn-close"
		}	
	}
	const toast = 
	`<div class=" ${notificationStatus[status]['background']} toast-header">` +
	  `<strong class="me-auto ${notificationStatus[status]['title']} ">${title}</strong>` +
	  `<button type="button" class="${notificationStatus[status]['close']}" data-bs-dismiss="toast" aria-label="Close"></button>` +
	'</div>' +
	`<div class="toast-body ${notificationStatus[status]['foreground']} ${notificationStatus[status]['background']} ">`+
	  `${body}`+
	'</div>' 

	const liveToast = document.getElementById('liveToast');
	liveToast.innerHTML = ""
	liveToast.innerHTML = toast

	const toastBootstrap = bootstrap.Toast.getOrCreateInstance(liveToast);
	toastBootstrap.show();

}
