document.addEventListener("DOMContentLoaded", () => {
    const containerDados = document.getElementById("dados-formulario");
    if (!containerDados) return;

    // Resgatar os parâmetros enviados via GET na URL
    const urlParams = new URLSearchParams(window.location.search);

    const camposObrigatorios = [
        { key: "nome", label: "Nome" },
        { key: "sobrenome", label: "Sobrenome" },
        { key: "email", label: "E-mail" },
        { key: "celular", label: "Celular" },
        { key: "organizacao", label: "Empresa/Organização" },
        { key: "timestamp", label: "Data e Hora do Envio" }
    ];

    let htmlConteudo = "";
    let encontrouDados = false;

    camposObrigatorios.forEach(campo => {
        const valor = urlParams.get(campo.key);
        if (valor) {
            encontrouDados = true;
            htmlConteudo += `<p><strong>${campo.label}:</strong> ${decodeURIComponent(valor)}</p>`;
        }
    });

    if (encontrouDados) {
        containerDados.innerHTML = htmlConteudo;
    } else {
        containerDados.innerHTML = "<p>Nenhum dado do formulário foi encontrado na requisição.</p>";
    }
});