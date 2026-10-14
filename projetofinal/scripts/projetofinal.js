const btnEcopontos = document.getElementById("btn-ecopontos");
const btnSucatas = document.getElementById("btn-sucatas");
const secaoEcopontos = document.getElementById("secao-ecopontos");
const secaoSucatas = document.getElementById("secao-sucatas");

if (btnEcopontos && btnSucatas && secaoEcopontos && secaoSucatas) {
    btnEcopontos.addEventListener("click", () => {
        secaoEcopontos.style.display = "block";
        secaoSucatas.style.display = "none";
        btnEcopontos.classList.add("active");
        btnSucatas.classList.remove("active");
    });

    btnSucatas.addEventListener("click", () => {
        secaoSucatas.style.display = "block";
        secaoEcopontos.style.display = "none";
        btnSucatas.classList.add("active");
        btnEcopontos.classList.remove("active");
    });
}

let visitas = localStorage.getItem("visitasProjeto");
if (!visitas) {
    visitas = 1;
} else {
    visitas = parseInt(visitas) + 1;
}
localStorage.setItem("visitasProjeto", visitas.toString());

const contadorElemento = document.getElementById("contador-visitas");
if (contadorElemento) {
    contadorElemento.textContent = visitas;
}

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

const modal = document.createElement("dialog");
modal.id = "info-modal";
modal.innerHTML = `
    <div id="modal-content"></div>
    <button class="close-modal">Fechar</button>
`;
document.body.appendChild(modal);

const closeModalBtn = modal.querySelector(".close-modal");
closeModalBtn.addEventListener("click", () => modal.close());

async function carregarDadosUnidades(urlJson, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    try {
        const response = await fetch(urlJson);
        if (!response.ok) throw new Error("Erro ao carregar o arquivo de dados.");
        
        const itens = await response.json();

        // Limpar container e utilizar métodos de array (forEach)
        container.innerHTML = "";
        
        itens.forEach(item => {
            const card = document.createElement("div");
            card.classList.add("card");
            
            // Correção aplicada: fechamento correto do template literal com a crase (`)
            card.innerHTML = `
                <img src="${item.foto}" alt="Foto de ${item.nome}" loading="lazy" width="300" height="180">
                <div class="card-body">
                    <h3 class="card-title">${item.nome}</h3>
                    <p class="card-text"><strong>Endereço:</strong> ${item.endereco}</p>
                    <p class="card-text"><strong>Tipo:</strong> ${item.tipo}</p>
                </div>
                <button class="btn-detalhes">Ver Detalhes</button>
            `;

            const btnDetalhes = card.querySelector(".btn-detalhes");
            btnDetalhes.addEventListener("click", () => {
                const modalContent = document.getElementById("modal-content");
                modalContent.innerHTML = `
                    <h2>${item.nome}</h2>
                    <p style="margin: 0.5rem 0;"><strong>Endereço Completo:</strong> ${item.endereco}</p>
                    <p style="margin: 0.5rem 0;"><strong>Categoria/Serviço:</strong> ${item.tipo}</p>
                    <img src="${item.foto}" alt="${item.nome}" style="margin-top: 1rem; border-radius: 4px; max-height: 200px; width: 100%; object-fit: cover;">
                `;
                modal.showModal();
            });

            container.appendChild(card);
        });

    } catch (error) {
        console.error("Erro no processamento assíncrono:", error);
        container.innerHTML = `<p>Não foi possível carregar as informações no momento.</p>`;
    }
}

carregarDadosUnidades("ecopontos.json", "ecopontos-container");
carregarDadosUnidades("sucatas.json", "sucatas-container");