// Project Slider Functionality
document.addEventListener('DOMContentLoaded', function() {
  const sliderTrack = document.querySelector('.slider-track');
  const slides = document.querySelectorAll('.project-slide');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  const dotsContainer = document.querySelector('.slider-dots');
  
  let currentIndex = 0;
  let slidesToShow = 3;
  
  function updateSlidesToShow() {
    if (window.innerWidth <= 640) {
      slidesToShow = 1;
    } else if (window.innerWidth <= 968) {
      slidesToShow = 2;
    } else {
      slidesToShow = 3;
    }
  }
  
  function createDots() {
    dotsContainer.innerHTML = '';
    const totalDots = slides.length - slidesToShow + 1;
    
    for (let i = 0; i < totalDots; i++) {
      const dot = document.createElement('div');
      dot.classList.add('dot');
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => goToSlide(i));
      dotsContainer.appendChild(dot);
    }
  }
  
  function updateDots() {
    const dots = document.querySelectorAll('.dot');
    
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentIndex);
    });
  }
  
  function updateSlider() {
    const slideWidth = slides[0].offsetWidth;
    const gap = 24; 
    
    const offset = -(currentIndex * (slideWidth + gap));
    sliderTrack.style.transform = `translateX(${offset}px)`;
    
    updateDots();
    updateButtons();
    updateActiveSlide();
    updateVisibleSlides();
  }

  function updateActiveSlide() {
    slides.forEach(s => s.classList.remove('center'));

    const centerOffset = Math.floor(slidesToShow / 2);
    const centerIndex = Math.min(currentIndex + centerOffset, slides.length - 1);

    if (slides[centerIndex]) slides[centerIndex].classList.add('center');
  }

  function updateVisibleSlides() {
    slides.forEach(s => {
      s.classList.remove('visible');
      s.classList.remove('edge');
    });

    const start = currentIndex;
    const end = Math.min(currentIndex + slidesToShow - 1, slides.length - 1);

    for (let i = start; i <= end; i++) {
      slides[i].classList.add('visible');
    }

    if (slides[start]) slides[start].classList.add('edge');
    if (slides[end]) slides[end].classList.add('edge');
  }
  
  function updateButtons() {
    const maxIndex = slides.length - slidesToShow;
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex >= maxIndex;
  }
  
  function goToSlide(slideIndex) {
    currentIndex = slideIndex;
    const maxIndex = slides.length - slidesToShow;
    currentIndex = Math.min(currentIndex, maxIndex);
    updateSlider();
  }
  
  function nextSlide() {
    const maxIndex = slides.length - slidesToShow;
    if (currentIndex < maxIndex) {
      currentIndex += 1;
      updateSlider();
    }
  }
  
  function prevSlide() {
    if (currentIndex > 0) {
      currentIndex -= 1;
      updateSlider();
    }
  }
  
  nextBtn.addEventListener('click', nextSlide);
  prevBtn.addEventListener('click', prevSlide);
  
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      prevSlide();
    } else if (e.key === 'ArrowRight') {
      nextSlide();
    }
  });
  
  let touchStartX = 0;
  let touchEndX = 0;
  
  sliderTrack.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });
  
  sliderTrack.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });
  
  function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
  }
  
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      updateSlidesToShow();
      currentIndex = 0;
      createDots();
      updateSlider();
    }, 250);
  });
  
  updateSlidesToShow();
  createDots();
  updateSlider();
});
