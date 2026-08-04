/* 
================================================================
  BUILDERS TEMPLATE - SLIDER INITIALIZATION (slider.js)
================================================================
*/

document.addEventListener('DOMContentLoaded', () => {
  initTestimonialSlider();
});

/**
 * Initializes SwiperJS for the client testimonials slider
 */
function initTestimonialSlider() {
  const sliderEl = document.querySelector('.swiper.testimonials-slider');
  if (!sliderEl) return;

  // Make sure Swiper is loaded from CDN
  if (typeof Swiper !== 'undefined') {
    new Swiper('.testimonials-slider', {
      // Core Parameters
      slidesPerView: 1,
      spaceBetween: 30,
      loop: true,
      grabCursor: true,
      
      // Autoplay settings
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true
      },

      // Pagination dots
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
        dynamicBullets: true
      },

      // Breakpoints for mobile responsiveness
      breakpoints: {
        // When window width is >= 768px (Tablet)
        768: {
          slidesPerView: 2,
          spaceBetween: 30
        },
        // When window width is >= 1024px (Desktop)
        1024: {
          slidesPerView: 3,
          spaceBetween: 30
        }
      }
    });
  } else {
    // Graceful fallback: Simple CSS transition slide logic if Swiper fails to load
    console.warn('Swiper library not loaded. Testimonial carousel fallback active.');
    setupFallbackSlider(sliderEl);
  }
}

/**
 * Basic fallback slider in case Swiper CDN fails to load
 */
function setupFallbackSlider(sliderEl) {
  const wrapper = sliderEl.querySelector('.swiper-wrapper');
  const slides = sliderEl.querySelectorAll('.swiper-slide');
  if (!wrapper || slides.length === 0) return;

  // Layout adjust for fallback
  wrapper.style.display = 'flex';
  wrapper.style.transition = 'transform 0.5s ease-in-out';
  wrapper.style.overflow = 'hidden';
  
  slides.forEach(slide => {
    slide.style.flex = '0 0 100%';
    slide.style.maxWidth = '100%';
  });

  let currentIndex = 0;

  setInterval(() => {
    currentIndex = (currentIndex + 1) % slides.length;
    const offset = -currentIndex * 100;
    wrapper.style.transform = `translateX(${offset}%)`;
  }, 5000);
}
