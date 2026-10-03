  const hamburgerBtn = document.getElementById("hamburger-menu");
    const navMenu = document.getElementById("nav-menu");

    if (hamburgerBtn && navMenu) {
        hamburgerBtn.addEventListener("click", () => {
            const isExpanded = hamburgerBtn.getAttribute("aria-expanded") === "true";
            navMenu.classList.toggle("open");
            hamburgerBtn.setAttribute("aria-expanded", !isExpanded);
        });
    }

const elAno = document.querySelector("#anoatual");
if (elAno) elAno.textContent = new Date().getFullYear();

const elModificacao = document.querySelector("#ultimaModificacao");
if (elModificacao) {
    const dataModificacao = new Date(document.lastModified);
    elModificacao.textContent = `Última atualização: ${dataModificacao.toLocaleDateString("pt-BR")}`;
}
    