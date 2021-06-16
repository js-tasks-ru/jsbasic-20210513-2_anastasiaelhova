import createElement from '../../assets/lib/create-element.js';

export default class CartIcon {
  constructor() {
    this.render();

    this.addEventListeners();
  }

  render() {
    this.elem = createElement('<div class="cart-icon"></div>');
  }

  update(cart) {
    if (!cart.isEmpty()) {
      this.elem.classList.add('cart-icon_visible');

      this.elem.innerHTML = `
        <div class="cart-icon__inner">
          <span class="cart-icon__count">${cart.getTotalCount()}</span>
          <span class="cart-icon__price">€${cart.getTotalPrice().toFixed(2)}</span>
        </div>`;

      this.updatePosition();

      this.elem.classList.add('shake');
      this.elem.addEventListener('transitionend', () => {
        this.elem.classList.remove('shake');
      }, {once: true});

    } else {
      this.elem.classList.remove('cart-icon_visible');
    }
  }

  addEventListeners() {
    document.addEventListener('scroll', () => this.updatePosition());
    window.addEventListener('resize', () => this.updatePosition());
  }

  updatePosition() {
    let cartIcon = this.elem;
    let topMargin = 50;  // начальный отступ иконки и отступ при фиксированной позиции
    let firstContainer = document.querySelector('.container');
    let topOffset = cartIcon.getBoundingClientRect().top;

    if (cartIcon.offsetWidth && cartIcon.offsetHeight && (pageYOffset > topMargin)) {  // проверяем видимость иконки и высоту прокрутки страницы
      let leftMargin = firstContainer.getBoundingClientRect().right + 20;
      cartIcon.style.position = 'fixed';
      cartIcon.style.top = `${topMargin}px`;
      cartIcon.style.left = `${leftMargin}px`;
    } else { // иначе сбрасываем в дефолтное состояние
      cartIcon.style.position = 'absolute';
      cartIcon.style.left = `auto`;
    }
  }
}