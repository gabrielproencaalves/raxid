import fetchPage from "./components/fetchPage.js";

const routes = {
  "/raxid/": { file: "./view/home.html", element: "main", script: ["./js/home.js"] },
  "/register": { file: "./view/register.html", element: "main", script: ["./js/register.js"] },
  "/analistic": { file: "./view/analistic.html", element: "main", script: ["./js/analistic.js"] }
};

export default function router(path) {
  const route = routes[path];
  if (route) {
    fetchPage({ element: route.element, file: route.file }).then(() => {
      if (route.script) {
				const scripts = Array.isArray(route.script) ? route.script : [route.script];
				scripts.forEach(loadScript);
			}
    });

		if( path != "/") 
			window.history.replaceState({}, "", `/view/${path}.html`);

  } else {
    fetchPage({ element: "main", file: "./view/404.html" });
  }
}

function navigateTo(url) {
  history.pushState(null, null, url);
  router(url);
}

document.addEventListener("DOMContentLoaded", () => {
  document.body.addEventListener("click", (e) => {
    if (e.target.matches("[data-link]")) {
      e.preventDefault();
      navigateTo(e.target.href);
    }
  });

  // Roteia a primeira vez ao carregar a página
  router(window.location.pathname);	
});

// Roteia ao usar os botões Voltar/Avançar do navegador
window.addEventListener("popstate", () => {
  router(window.location.pathname);
});

function loadScript(src) {
	const existing = document.querySelector(`script[src="${src}"]`);
	if (existing) {
		existing.remove(); // Remove se já estiver carregado (para evitar duplicação)
  }
  const script = document.createElement("script");
  script.src = src;
  script.type = "module"; // ou "text/javascript"
	document.body.appendChild(script);
}
