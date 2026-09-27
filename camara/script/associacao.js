document.addEventListener("DOMContentLoaded", () => {
    // 1. Preenchimento do campo Timestamp oculto com Data/Hora atual
    const inputTimestamp = document.getElementById("timestamp");
    if (inputTimestamp) {
        const agora = new Date();
        inputTimestamp.value = agora.toLocaleString("pt-BR", {
            dateStyle: "full",
            timeStyle: "medium"
        });
    }

    // 2. Manipulação dos Modais (<dialog>)
    const botoesModal = document.querySelectorAll(".btn-info");
    const botoesFechar = document.querySelectorAll(".btn-close");

    botoesModal.forEach(btn => {
        btn.addEventListener("click", () => {
            const modalId = btn.getAttribute("data-modal");
            const modal = document.getElementById(modalId);
            if (modal) modal.showModal();
        });
    });

    botoesFechar.forEach(btn => {
        btn.addEventListener("click", () => {
            const modal = btn.closest("dialog");
            if (modal) modal.close();
        });
    });
});