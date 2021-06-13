import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    this.elem = document.createElement('div');
    this.slides = slides;
    this._carouselWidth = 0;
    this.render();
    this.bindEvents();
  }

  render() {
    this.elem.classList.add('carousel');

    let slidesHtml = this.slides.map((slide) => `
      <div class="carousel__slide" data-id="penang-shrimp">
        <img src="/assets/images/carousel/${slide.image}" class="carousel__img" alt="slide">
        <div class="carousel__caption">
          <span class="carousel__price">€${(slide.price).toFixed(2)}</span>
          <div class="carousel__title">${slide.name}</div>
          <button type="button" class="carousel__button" data-product-id="${slide.id}">
            <img src="/assets/images/icons/plus-icon.svg" alt="icon">
          </button>
        </div>
      </div>
    `).join('');

    this.elem.innerHTML = `
      <div class="carousel__arrow carousel__arrow_right">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </div>
      <div class="carousel__arrow carousel__arrow_left">
        <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
      </div>
      <div class="carousel__inner">
        ${slidesHtml}
      </div>
    `;
  }

  bindEvents() {
    this.initCarousel();
    this.initEventProductAdd();
  }

  initCarousel() {
    let carousel = this.elem.querySelector('.carousel__inner');
    let carouselSlidesCount = this.elem.querySelectorAll('.carousel__slide').length;
    let arrowLeft = this.elem.querySelector('.carousel__arrow_left');
    let arrowRight = this.elem.querySelector('.carousel__arrow_right');
    let translateCurrent = 0;  // текущий сдвиг по Х. изначально - 0
    arrowLeft.style.display = 'none';

    arrowLeft.onclick = function() {
      this._carouselWidth = carousel.offsetWidth; // узнать ширину карусели можно только после добавления на страницу, т.е. после первого клика
      let translateX = translateCurrent + this._carouselWidth;
      carousel.style.transform = `translateX(${translateX}px)`;
      translateCurrent = translateX;

      if (translateX === 0) {
        arrowLeft.style.display = 'none';
      } else {
        arrowRight.style.display = '';
      }
    };

    arrowRight.onclick = function() {
      this._carouselWidth = carousel.offsetWidth; // узнать ширину карусели можно только после добавления на страницу, т.е. после первого клика
      let carouselTranslateMax = 0 - this._carouselWidth * (carouselSlidesCount-1);
      let translateX = translateCurrent - this._carouselWidth;
      carousel.style.transform = `translateX(${translateX}px)`;
      translateCurrent = translateX;

      if (translateX === carouselTranslateMax) {
        arrowRight.style.display = 'none';
      } else {
        arrowLeft.style.display = '';
      }
    };
  }

  initEventProductAdd() {
    let buttons = this.elem.querySelectorAll('.carousel__button');
    for(let button of buttons) {
      let event = new CustomEvent("product-add", {
        detail: button.dataset.productId,
        bubbles: true
      });

      button.onclick = function() {
        console.log(button.dataset.productId);
        button.dispatchEvent(event);
      }
    }
  }
}