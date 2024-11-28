document.addEventListener("DOMContentLoaded", () => {
  const carousel = document.querySelector(".carousel");
  const track = document.querySelector(".carousel__track");
  const cards = Array.from(track.children);

  let scrollSpeed = 1;
  let currentTranslate = 0;
  let animationId;
  let isDragging = false;
  let startPosition = 0;
  let prevTranslate = 0;
  const cardWidth = cards[0].getBoundingClientRect().width;

  const visibleCardsCount = Math.ceil(carousel.offsetWidth / cardWidth);

  function cloneCards() {
    const clonesToStart = cards.slice(-visibleCardsCount);
    const clonesToEnd = cards.slice(0, visibleCardsCount);

    clonesToStart.forEach((card) => {
      const clone = card.cloneNode(true);
      clone.classList.add("clone");
      track.prepend(clone);
    });

    clonesToEnd.forEach((card) => {
      const clone = card.cloneNode(true);
      clone.classList.add("clone");
      track.appendChild(clone);
    });

    currentTranslate = -cardWidth * visibleCardsCount;
    track.style.transform = `translateX(${currentTranslate}px)`;
  }

  cloneCards();

  function startContinuousAnimation() {
    cancelAnimationFrame(animationId);
    animationId = requestAnimationFrame(animate);
  }

  function animate() {
    const totalCards = track.children.length;
    const maxTranslate = -cardWidth * (totalCards - visibleCardsCount);
    const resetTranslate = -cardWidth * visibleCardsCount;

    if (!isDragging) {
      currentTranslate -= scrollSpeed;
      track.style.transform = `translateX(${currentTranslate}px)`;
    }

    if (currentTranslate <= maxTranslate) {
      currentTranslate = resetTranslate;
      track.style.transform = `translateX(${currentTranslate}px)`;
    }

    if (currentTranslate >= 0) {
      currentTranslate = maxTranslate;
      track.style.transform = `translateX(${currentTranslate}px)`;
    }

    animationId = requestAnimationFrame(animate);
  }

  carousel.addEventListener("mousedown", (e) => {
    isDragging = true;
    startPosition = e.pageX;
    prevTranslate = currentTranslate;
    cancelAnimationFrame(animationId);
  });

  carousel.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    const delta = e.pageX - startPosition;
    currentTranslate = prevTranslate + delta;
    track.style.transform = `translateX(${currentTranslate}px)`;
  });

  carousel.addEventListener("mouseup", handleDragEnd);
  carousel.addEventListener("mouseleave", handleDragEnd);

  carousel.addEventListener("touchstart", (e) => {
    isDragging = true;
    startPosition = e.touches[0].clientX;
    prevTranslate = currentTranslate;
    cancelAnimationFrame(animationId);
  });

  carousel.addEventListener("touchmove", (e) => {
    if (!isDragging) return;
    const delta = e.touches[0].clientX - startPosition;
    currentTranslate = prevTranslate + delta;
    track.style.transform = `translateX(${currentTranslate}px)`;
  });

  carousel.addEventListener("touchend", handleDragEnd);
  carousel.addEventListener("touchcancel", handleDragEnd);

  function handleDragEnd() {
    if (isDragging) {
      isDragging = false;
      startContinuousAnimation();
    }
  }

  window.addEventListener("resize", () => {
    const cardWidth = cards[0].getBoundingClientRect().width;
    currentTranslate = -cardWidth * visibleCardsCount;
    track.style.transform = `translateX(${currentTranslate}px)`;
  });

  carousel.addEventListener("dragstart", (e) => e.preventDefault());

  startContinuousAnimation();
});
