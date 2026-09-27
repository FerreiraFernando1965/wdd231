
// Atualização do ano no rodapé
document.querySelector("#anoatual").textContent = new Date().getFullYear();

// Fornece  a data da última modificação
const dataModificacao = new Date(document.lastModified);

// Formata para exibir APENAS a data (dia/mês/ano) Padrão brasileiro
const dataFormatada = dataModificacao.toLocaleDateString("pt-BR");

// Exibe no rodapé apenas a data
document.querySelector("#ultimaModificacao").textContent = `Última modificação: ${dataFormatada}`;

// Menu Hambúrguer (Mobile)
const botaoMenu = document.getElementById("botao-menu");
const menuNav = document.querySelector("nav");