document.addEventListener("DOMContentLoaded", () => {
    // 1. Menu Hambúrguer (Mobile)
    const hamburgerBtn = document.getElementById("hamburger-menu");
    const navMenu = document.getElementById("nav-menu");

    if (hamburgerBtn && navMenu) {
        hamburgerBtn.addEventListener("click", () => {
            const isExpanded = hamburgerBtn.getAttribute("aria-expanded") === "true";
            
            // Alterna a classe 'open' para estilização CSS
            navMenu.classList.toggle("open");
            
            // Atualiza acessibilidade
            hamburgerBtn.setAttribute("aria-expanded", !isExpanded);
        });
    }

    // 2. Atualização do ano e modificação no rodapé
    const anoAtualEl = document.querySelector("#anoatual");
    if (anoAtualEl) {
        anoAtualEl.textContent = new Date().getFullYear();
    }

    const ultimaModificacaoEl = document.querySelector("#ultimaModificacao");
    if (ultimaModificacaoEl) {
        const dataModificacao = new Date(document.lastModified);
        const dataFormatada = dataModificacao.toLocaleDateString("pt-BR");
        ultimaModificacaoEl.textContent = `Última modificação: ${dataFormatada}`;
    }

    // 3. Previsão do Tempo para Campinas (API Open-Meteo)
    const weatherContainer = document.getElementById("weather-info");
    
    if (weatherContainer) {
        const urlClima = "https://api.open-meteo.com/v1/forecast?latitude=-22.9056&longitude=-47.0608&current=temperature_2m,relative_humidity_2m,weather_code&timezone=America%2FSao_Paulo";

        fetch(urlClima)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Falha na resposta da API");
                }
                return response.json();
            })
            .then(data => {
                const temp = Math.round(data.current.temperature_2m);
                const umidade = data.current.relative_humidity_2m;
                const codigoClima = data.current.weather_code;
                const descricaoClima = traduzirCodigoTempo(codigoClima);

                weatherContainer.innerHTML = `
                    <p class="weather-temp"><strong>${temp}°C</strong> — ${descricaoClima}</p>
                    <p class="weather-extra">Umidade do ar: ${umidade}%</p>
                `;
            })
            .catch(error => {
                console.error("Erro ao carregar dados do tempo:", error);
                weatherContainer.innerHTML = `<p>Não foi possível carregar a previsão do tempo no momento.</p>`;
            });
    }
}); // Fechamento correto do DOMContentLoaded

// Função auxiliar mantida no escopo global
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