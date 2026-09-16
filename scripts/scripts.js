document.addEventListener("DOMContentLoaded", () => {
    // 1. Menu Hambúrguer (Mobile) - Prioridade alta de interação
    const hamburgerBtn = document.getElementById("hamburger-menu");
    const navMenu = document.getElementById("nav-menu");

    if (hamburgerBtn && navMenu) {
        hamburgerBtn.addEventListener("click", () => {
            const isExpanded = hamburgerBtn.getAttribute("aria-expanded") === "true";
            navMenu.classList.toggle("open");
            hamburgerBtn.setAttribute("aria-expanded", !isExpanded);
        });
    }

    // 2. Executar tarefas não críticas após a thread principal ficar ociosa
    if ("requestIdleCallback" in window) {
        requestIdleCallback(initNonCriticalFeatures);
    } else {
        setTimeout(initNonCriticalFeatures, 200);
    }
});

// Inicialização de datas no rodapé
const elAno = document.querySelector("#anoatual");
if (elAno) elAno.textContent = new Date().getFullYear();

const elModificacao = document.querySelector("#ultimaModificacao");
if (elModificacao) {
    const dataModificacao = new Date(document.lastModified);
    elModificacao.textContent = `Última atualização: ${dataModificacao.toLocaleDateString("pt-BR")}`;
    }

    // Previsão do Tempo
    carregarClima();


async function carregarClima() {
    const weatherContainer = document.getElementById("weather-info");
    if (!weatherContainer) return;

    // URL otimizada com apenas os campos estritamente necessários
    const urlClima = "https://api.open-meteo.com/v1/forecast?latitude=-22.9056&longitude=-47.0608&current=temperature_2m,relative_humidity_2m,weather_code&timezone=America%2FSao_Paulo";

    try {
        const response = await fetch(urlClima);
        if (!response.ok) throw new Error("Falha na resposta da API");

        const data = await response.json();
        const temp = Math.round(data.current.temperature_2m);
        const umidade = data.current.relative_humidity_2m;
        const descricaoClima = traduzirCodigoTempo(data.current.weather_code);

        weatherContainer.innerHTML = `
            <p class="weather-temp"><strong>${temp}°C</strong> — ${descricaoClima}</p>
            <p class="weather-extra">Umidade do ar: ${umidade}%</p>
        `;
    } catch (error) {
        console.error("Erro ao carregar dados do tempo:", error);
        weatherContainer.innerHTML = `<p>Não foi possível carregar a previsão do tempo no momento.</p>`;
    }
}

function traduzirCodigoTempo(code) {
    const codigos = {
        0: "Céu limpo ☀️",
        1: "Predominantemente limpo 🌤️",
        2: "Parcialmente nublado ⛅",
        3: "Nublado ☁️",
        45: "Nevoeiro 🌫️",
        48: "Nevoeiro com geada 🌫️",
        51: "Garoa leve 🌧️",
        53: "Garoa moderada 🌧️",
        55: "Garoa densa 🌧️",
        61: "Chuva leve 🌧️",
        63: "Chuva moderada 🌧️",
        65: "Chuva forte 🌧️",
        80: "Pancadas de chuva leves 🌦️",
        81: "Pancadas de chuva moderadas 🌦️",
        82: "Pancadas de chuva violentas ⛈️",
        95: "Temporal 🌩️"
    };
    return codigos[code] || "Condições variáveis";
}