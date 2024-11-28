document.addEventListener("DOMContentLoaded", () => {
  // Selecionando todas as galerias
  const galleries = document.querySelectorAll(
    ".container-gallery-abcx, .container-gallery-prime"
  );

  galleries.forEach((gallery) => {
    let isDragging = false;
    let startX = 0;
    let scrollLeft = 0;

    // Função para centralizar no mobile
    const centerGalleryOnMobile = () => {
      const isMobile = window.innerWidth <= 600; // Detecta telas menores
      if (isMobile) {
        const extraSpace = (gallery.scrollWidth - gallery.offsetWidth) / 2; // Calcular espaço extra
        gallery.scrollLeft = extraSpace; // Centraliza na tela
      }
    };

    // Centraliza ao carregar a página e ao redimensionar a janela
    centerGalleryOnMobile();
    window.addEventListener("resize", centerGalleryOnMobile);

    // Início da interação (arrastar)
    gallery.addEventListener("mousedown", (e) => {
      isDragging = true;
      startX = e.pageX;
      scrollLeft = gallery.scrollLeft;
      gallery.style.scrollBehavior = "auto"; // Remove a suavidade durante a interação
    });

    gallery.addEventListener("touchstart", (e) => {
      isDragging = true;
      startX = e.touches[0].pageX;
      scrollLeft = gallery.scrollLeft;
      gallery.style.scrollBehavior = "auto"; // Remove a suavidade durante a interação
    });

    // Movimentação da galeria durante o arraste
    gallery.addEventListener("mousemove", (e) => {
      if (!isDragging) return;
      const x = e.pageX;
      const walk = startX - x; // Distância arrastada
      gallery.scrollLeft = scrollLeft + walk; // Atualiza posição
    });

    gallery.addEventListener("touchmove", (e) => {
      if (!isDragging) return;
      const x = e.touches[0].pageX;
      const walk = startX - x; // Distância arrastada
      gallery.scrollLeft = scrollLeft + walk; // Atualiza posição
    });

    // Encerrando o arraste
    const stopDragging = () => {
      isDragging = false;
      gallery.style.scrollBehavior = "smooth"; // Reaplica a suavidade
    };

    gallery.addEventListener("mouseup", stopDragging);
    gallery.addEventListener("mouseleave", stopDragging);
    gallery.addEventListener("touchend", stopDragging);
  });
});
