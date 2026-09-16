// Array de Cursos
const cursos = [
    {
        assunto: 'CSE',
        numero: 110,
        titulo: 'Introduction to Programming',
        creditos: 2,
        certificado: 'Web and Computer Programming',
        descricao: 'This course will introduce students to programming.',
        tecnologia: ['Python'],
        concluido: true
    },
    {
        assunto: 'WDD',
        numero: 130,
        titulo: 'Web Fundamentals',
        creditos: 2,
        certificado: 'Web and Computer Programming',
        descricao: 'This course introduces students to the World Wide Web.',
        tecnologia: ['HTML', 'CSS'],
        concluido: true
    },
    {
        assunto: 'CSE',
        numero: 111,
        titulo: 'Programming with Functions',
        creditos: 2,
        certificado: 'Web and Computer Programming',
        descricao: 'CSE 111 students become more organized, efficient programmers.',
        tecnologia: ['Python'],
        concluido: true
    },
    {
        assunto: 'CSE',
        numero: 210,
        titulo: 'Programming with Classes',
        creditos: 2,
        certificado: 'Web and Computer Programming',
        descricao: 'This course will introduce the notion of classes and objects.',
        tecnologia: ['C#'],
        concluido: false
    },
    {
        assunto: 'WDD',
        numero: 131,
        titulo: 'Dynamic Web Fundamentals',
        creditos: 2,
        certificado: 'Web and Computer Programming',
        descricao: 'This course builds on prior experience in Web Fundamentals.',
        tecnologia: ['HTML', 'CSS', 'JavaScript'],
        concluido: true
    },
    {
        assunto: 'WDD',
        numero: 231,
        titulo: 'Frontend Web Development I',
        creditos: 2,
        certificado: 'Web and Computer Programming',
        descricao: 'This course builds on prior experience with Dynamic Web Fundamentals.',
        tecnologia: ['HTML', 'CSS', 'JavaScript'],
        concluido: false
    }
];

document.addEventListener("DOMContentLoaded", () => {
    const courseContainer = document.querySelector(".course-list");
    const creditsContainer = document.querySelector(".credits-info strong");
    const filterButtons = document.querySelectorAll(".btn-filter");
    const menuToggle = document.getElementById("menu-toggle");
    const navMenu = document.getElementById("nav-menu");

    // Toggle do Menu Hambúrguer (Mobile)
    if (menuToggle && navMenu) {
        menuToggle.addEventListener("click", () => {
            navMenu.classList.toggle("open");
        });
    }

    // Função para renderizar os cursos e calcular os créditos
    function displayCourses(filteredCourses) {
        courseContainer.innerHTML = "";

        filteredCourses.forEach(curso => {
            const courseCard = document.createElement("div");
            courseCard.classList.add("btn", "btn-course");
            
            if (curso.concluido) {
                courseCard.classList.add("completed");
            }

            courseCard.textContent = `${curso.assunto} ${curso.numero}`;
            courseContainer.appendChild(courseCard);
        });

        // Atualiza a soma dos créditos dos cursos exibidos na tela
        const totalCreditos = filteredCourses.reduce((sum, curso) => sum + curso.creditos, 0);
        if (creditsContainer) {
            creditsContainer.textContent = totalCreditos;
        }
    }

    // Filtros de Cursos
    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            filterButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");

            const category = button.textContent.trim();

            if (category === "CSE") {
                displayCourses(cursos.filter(c => c.assunto === "CSE"));
            } else if (category === "WDD") {
                displayCourses(cursos.filter(c => c.assunto === "WDD"));
            } else {
                displayCourses(cursos);
            }
        });
    });

    // Exibição Inicial
    displayCourses(cursos);

    // Atualização de Ano e Data no Rodapé
    const anoElemento = document.getElementById("anoatual");
    const modifElemento = document.getElementById("ultimaModificacao");

    if (anoElemento) anoElemento.textContent = new Date().getFullYear();
    if (modifElemento) modifElemento.textContent = `Última Modificação: ${document.lastModified}`;
});