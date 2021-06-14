import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.elem = document.createElement('div');
    this.categories = categories;
    this._scrollBy = 350;
    this.render();
    this.bindEvents();
  }

  render() {
    this.elem.classList.add('ribbon');

    let categoriesHtml = this.categories.map((category) => `
      <a href="#" class="ribbon__item" data-id="${category.id}">${category.name}</a>
    `).join('');

    this.elem.innerHTML = `
      <button class="ribbon__arrow ribbon__arrow_left">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </button>
      <nav class="ribbon__inner">
        ${categoriesHtml}
      </nav>
      <button class="ribbon__arrow ribbon__arrow_right">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </button>
    `;
  }

  bindEvents() {
    let arrowLeft = this.elem.querySelector('.ribbon__arrow_left');
    let arrowRight = this.elem.querySelector('.ribbon__arrow_right');
    let ribbonInner = this.elem.querySelector('.ribbon__inner');
    let ribbonItems = this.elem.querySelectorAll('.ribbon__item');
    arrowRight.classList.add('ribbon__arrow_visible');

    arrowRight.onclick = () => {
      this.scrollRight(ribbonInner);
    };

    arrowLeft.onclick = () => {
      this.scrollLeft(ribbonInner);
    };

    ribbonInner.onscroll = () => {
      this.scrollInner(ribbonInner, arrowLeft, arrowRight);
    };

    for (let ribbonItem of ribbonItems) {
      ribbonItem.onclick = (event) => {
        this.getActiveRibbonItem(event, ribbonItem);
      }
    }
  }

  scrollRight(ribbonInner) {
    ribbonInner.scrollBy(this._scrollBy, 0);
  }

  scrollLeft(ribbonInner) {
    ribbonInner.scrollBy(-(this._scrollBy), 0);
  }

  scrollInner(ribbonInner, arrowLeft, arrowRight) {
    let scrollWidth = ribbonInner.scrollWidth;
    let clientWidth = ribbonInner.clientWidth;

    let scrollLeft = ribbonInner.scrollLeft;
    let scrollRight = scrollWidth - scrollLeft - clientWidth;

    if (Math.trunc(scrollRight) === 0) { // отбрасываем дробную часть
      arrowRight.classList.remove('ribbon__arrow_visible');
    } else {
      arrowRight.classList.add('ribbon__arrow_visible');
    }

    if (Math.trunc(scrollLeft) === 0) { // отбрасываем дробную часть
      arrowLeft.classList.remove('ribbon__arrow_visible');
    } else {
      arrowLeft.classList.add('ribbon__arrow_visible');
    }
  }

  getActiveRibbonItem(event, ribbonItem) {
    event.preventDefault();

    let prevActiveItem = this.elem.querySelector('.ribbon__item_active');
    if (prevActiveItem) {
      prevActiveItem.classList.remove('ribbon__item_active');
    }
    ribbonItem.classList.add('ribbon__item_active');

    let eventRibbon = new CustomEvent('ribbon-select', {
      detail: ribbonItem.dataset.id,
      bubbles: true
    });

    this.elem.dispatchEvent(eventRibbon);
  }
}
