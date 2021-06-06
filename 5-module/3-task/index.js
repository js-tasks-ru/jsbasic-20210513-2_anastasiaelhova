let selectorCarousel = '.carousel__inner';
let selectorCarouselSlide = '.carousel__slide';
let selectorArrowRight = '.carousel__arrow_right';
let selectorArrowLeft = '.carousel__arrow_left';

function initCarousel() {
  let arrowLeft = document.querySelector(selectorArrowLeft);
  let carousel = document.querySelector(selectorCarousel);
  carousel.dataset.translateCurrent = 0;  // текущий сдвиг по Х. изначально - 0
  arrowLeft.style.display = 'none';
  initArrow('left');
  initArrow('right');
}

function initArrow(direction) {
  let carousel = document.querySelector(selectorCarousel);
  let carouselSlidesCount = carousel.querySelectorAll(selectorCarouselSlide).length;
  let arrowLeft = document.querySelector(selectorArrowLeft);
  let arrowRight = document.querySelector(selectorArrowRight);
  let frameWidth = carousel.offsetWidth;
  let translateMax = 0 - frameWidth * (carouselSlidesCount-1);
  let arrow = document.querySelector(selectorArrowLeft);
  if (direction === 'right') {
    arrow = document.querySelector(selectorArrowRight);
  }
  
  arrow.onclick = function() {
    let markDirection = 1;
    if (direction === 'right') {
      markDirection = -1;
    }
    let translateX = Number(carousel.dataset.translateCurrent) + markDirection * frameWidth;
    carousel.style.transform = `translateX(${translateX}px)`;
    carousel.dataset.translateCurrent = translateX;

    if (translateX === 0) {
      arrowLeft.style.display = 'none';
    } else {
      arrowLeft.style.display = '';
    }

    if (translateX === translateMax) {
      arrowRight.style.display = 'none';
    } else {
      arrowRight.style.display = '';
    }

  };
}