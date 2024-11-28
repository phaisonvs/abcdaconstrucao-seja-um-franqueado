// Seleciona o ícone do menu e o navbar
const menuIcon = document.querySelector(".menu-icon");
const navbar = document.querySelector(".navbar");

// Adiciona o evento de clique
menuIcon.addEventListener("click", () => {
  navbar.classList.toggle("active"); // Mostra ou esconde os itens
});
