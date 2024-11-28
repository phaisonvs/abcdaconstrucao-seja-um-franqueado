// Define o ano de inauguração
const inaugurationYear = 1958;

// Obtém o ano atual
const currentYear = new Date().getFullYear();

// Calcula a diferença (idade da empresa)
const experienceYears = currentYear - inaugurationYear;

// Atualiza o valor no elemento com o ID "experience-years"
document.getElementById("experience-years").textContent = `+${experienceYears}`;
