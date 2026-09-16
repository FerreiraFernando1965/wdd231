// Array da Lista de Empresas
const empresas = [
    {
        nome: "Assaí Atacadista",
        categoria: "Alimentos",
        descricao: "Supermercado atacadista com ampla variedade de produtos.",
        imagem: "assai.webp"
    },
    {
        nome: "KFC",
        categoria: "Alimentos",
        descricao: "Restaurante de frango frito com diversos acompanhamentos.",
        imagem: "kfc.webp"
    },
    {
        nome: "Sanasa",
        categoria: "Saneamento básico",
        descricao: "Empresa especializada em soluções de saneamento.",
        imagem: "sanasa.webp"
    },
    {
        nome: "Leroy Merlin",
        categoria: "Materiais de construção",
        descricao: "Loja de materiais de construção com ampla variedade de produtos.",
        imagem: "leroymerlin.webp"
    },
    {
        nome: "Unicamp",
        categoria: "Educação",
        descricao: "Universidade pública com cursos de graduação e pós-graduação.",
        imagem: "unicamp.webp"
    },
    {
        nome: "UNIP",
        categoria: "Educação",
        descricao: "Universidade privada com cursos de graduação e pós-graduação.",
        imagem: "unip.webp"
    },
    {
        nome: "Burger King",
        categoria: "Alimentos",
        descricao: "Restaurante de hambúrgueres com diversos acompanhamentos.",
        imagem: "burgerking.webp"
    },
    {
        nome: "DoMendes",
        categoria: "Alimentos",
        descricao: "Pizzaria especializada em pizzas artesanais.",
        imagem: "domendes.webp"
    },
    {
        nome: "Coco Bambu",
        categoria: "Alimentos",
        descricao: "Restaurante especializado em pratos tropicais e bebidas exóticas.",
        imagem: "cocobambu.webp"
    },
    {
        nome: "Sorvetes Sergel",
        categoria: "Alimentos",
        descricao: "Sorveteria especializada em sabores exclusivos.",
        imagem: "sergel.webp"
    },
    {
        nome: "O Matuto",
        categoria: "Alimentos",
        descricao: "Restaurante especializado em pratos quentes, churrasco e bebidas exóticas.",
        imagem: "omatuto.webp"
    }
];

// Função para renderizar as empresas na tela
function renderizarEmpresas(lista) {
    const grid = document.querySelector("#grid-cardapio-dinamico");
    if (!grid) return;
    grid.innerHTML = "";

    lista.forEach(empresa => {
        const card = document.createElement("article");
        card.classList.add("card-empresa");
        card.innerHTML = `
            <img src="img/${empresa.imagem}" alt="Logo ${empresa.nome}" loading="lazy">
            <h3>${empresa.nome}</h3>
            <span class="categoria">${empresa.categoria}</span>
            <p>${empresa.descricao}</p>
        `;
        grid.appendChild(card);
    });
}

// Filtro de Categorias
const botoesFiltro = document.querySelectorAll(".btn-filtro");

botoesFiltro.forEach(botao => {
    botao.addEventListener("click", (e) => {
        const categoria = e.target.getAttribute("data-categoria");
        
        // Atualiza estado ativo dos botões
        botoesFiltro.forEach(b => b.classList.remove("active"));
        e.target.classList.add("active");

        // Filtra a lista
        if (categoria === "todos") {
            renderizarEmpresas(empresas);
        } else {
            const empresasFiltradas = empresas.filter(empresa => empresa.categoria === categoria);
            renderizarEmpresas(empresasFiltradas);
        }
    });
});

// Abertura e fechamento do Menu Hambúrguer (Mobile)
const btnHamburger = document.querySelector("#hamburger-menu");
const navMenu = document.querySelector("#nav-menu");

if (btnHamburger && navMenu) {
    btnHamburger.addEventListener("click", () => {
        navMenu.classList.toggle("open");
    });
}

// Inicialização de datas no rodapé
const elAno = document.querySelector("#anoatual");
if (elAno) elAno.textContent = new Date().getFullYear();

const elModificacao = document.querySelector("#ultimaModificacao");
if (elModificacao) {
    const dataModificacao = new Date(document.lastModified);
    elModificacao.textContent = `Última atualização: ${dataModificacao.toLocaleDateString("pt-BR")}`;
}

// Inicializar carregando todas as empresas
renderizarEmpresas(empresas);