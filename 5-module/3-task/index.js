let selectorCarousel = '.carousel__inner';
let selectorCarouselSlide = '.carousel__slide';
let selectorArrowRight = '.carousel__arrow_right';
let selectorArrowLeft = '.carousel__arrow_left';
let translateCurrent = 0;  // текущий сдвиг по Х. изначально - 0

function initCarousel() {
  let arrowLeft = document.querySelector(selectorArrowLeft);
  arrowLeft.style.display = 'none';
  initArrows();
}

function initArrows() {
  let carousel = document.querySelector(selectorCarousel);
  let carouselSlidesCount = carousel.querySelectorAll(selectorCarouselSlide).length;
  let arrowLeft = document.querySelector(selectorArrowLeft);
  let arrowRight = document.querySelector(selectorArrowRight);
  let frameWidth = carousel.offsetWidth;
  let translateMax = 0 - frameWidth * (carouselSlidesCount-1);
  
  arrowLeft.onclick = function() {
    let translateX = translateCurrent + frameWidth;
    carousel.style.transform = `translateX(${translateX}px)`;
    translateCurrent = translateX;

    if (translateX === 0) {
      arrowLeft.style.display = 'none';
    } else {
      arrowRight.style.display = '';
    }
  };

  arrowRight.onclick = function() {
    let translateX = translateCurrent - frameWidth;
    carousel.style.transform = `translateX(${translateX}px)`;
    translateCurrent = translateX;

    if (translateX === translateMax) {
      arrowRight.style.display = 'none';
    } else {
      arrowLeft.style.display = '';
    }
  };
}