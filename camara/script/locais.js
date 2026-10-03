import {locais} from './locais.mjs';
console.log(locais);
const lugares= document.querySelector("#lugares")
function exibirItens(locais) {
    locais.forEach(x => {
        const painel = document.createElement("div")
   const foto = document.createElement("img")
    foto.src = ../imagens/${x.foto}
    foto.alt = x.nome
    painel.appendChild(foto)
    const titulo = document.createElement("h2")
    titulo.innerText = x.nome
    painel.appendChild(titulo)
    const endereco = document.createElement("endereco")
    endereco.innerText = x.endereco
    painel.appendChild(endereco)
    const descricao = document.createElement("p")
    descricao.innerText = x.descricao
    painel.appendChild(descricao)
    lugares.appendChild(painel)
})
}
exibirItens(locais)