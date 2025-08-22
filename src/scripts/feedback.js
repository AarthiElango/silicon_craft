var swiper = new Swiper(".mySwiper", {
    slidesPerView: 3,   // 3 testimonials at a time
    spaceBetween: 20,   // spacing between them
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    breakpoints: {
      0: { slidesPerView: 1 },   // mobile
      768: { slidesPerView: 2 }, // tablet
      1024: { slidesPerView: 3 } // desktop
    }
  });