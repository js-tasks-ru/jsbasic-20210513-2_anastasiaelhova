import createElement from '../../assets/lib/create-element.js';
import escapeHtml from '../../assets/lib/escape-html.js';

import Modal from '../../7-module/2-task/index.js';

export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
    this._cartModal;
    this.addEventListeners();
  }

  addProduct(product) {

    let flagUniqueProduct = true;

    for (let cartItem of this.cartItems) {
      if (cartItem.product.id === product.id) { // если такой продукт уже есть в корзине, увеличить кол-во
        cartItem.count++;
        flagUniqueProduct = false;
        this.onProductUpdate(cartItem);
      }
    }

    if (flagUniqueProduct) { // иначе добавить этот продукт
      let cartItemNew = { 'product': product, 'count': 1 };
      this.cartItems.push(cartItemNew);
      this.onProductUpdate(cartItemNew);
    }
  }

  updateProductCount(productId, amount) {

    for (let cartItem of this.cartItems) {
      if (cartItem.product.id === productId) { // если такой продукт уже есть в корзине, увеличить кол-во
        cartItem.count += amount;
        if (cartItem.count === 0) { // если кол-во товара в корзине 0, удаляем его
          this.cartItems.splice( this.cartItems.indexOf(cartItem), 1 );
        }
        this.onProductUpdate(cartItem);
      }
    }
  }

  isEmpty() {
    return !Boolean(this.cartItems.length);
  }

  getTotalCount() {
    let totalCount = 0;
    for (let cartItem of this.cartItems) {
      totalCount += cartItem.count;
    }
    return totalCount;
  }

  getTotalPrice() {
    let totalPrice = 0;
    for (let cartItem of this.cartItems) {
      totalPrice += cartItem.product.price * cartItem.count;
    }
    return totalPrice;
  }

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${
        product.id
        }">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${(product.price * count).toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(2)}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  renderModal() {
    this._cartModal = new Modal();
    let modalBody = createElement('<div>');

    this.cartItems.map( (cartItem) => {
      modalBody.append(this.renderProduct(cartItem.product, cartItem.count));
    });

    modalBody.append(this.renderOrderForm());
    this._cartModal.setTitle('Your order');
    this._cartModal.setBody(modalBody);
    this._cartModal.open();

    let cartCounters = this._cartModal.elem.querySelectorAll('.cart-counter__button');
    for (let cartCounter of cartCounters) {
      cartCounter.onclick = () => {
        let productId = cartCounter.closest('[data-product-id]').dataset.productId;

        if (cartCounter.classList.contains('cart-counter__button_minus')) {
          this.updateProductCount(productId, -1);
        }
        if (cartCounter.classList.contains('cart-counter__button_plus')) {
          this.updateProductCount(productId, 1);
        }
      }
    }

    let cartForm = this._cartModal.elem.querySelector('.cart-form');
    cartForm.onsubmit = (event) => this.onSubmit(event, cartForm);
  }

  onProductUpdate(cartItem) {
    this.cartIcon.update(this);
    if (document.querySelector('body').classList.contains('is-modal-open')) {

      let productId = cartItem.product.id;
      let modalBody = this._cartModal.elem.querySelector('.modal__body');

      let product = modalBody.querySelector(`[data-product-id="${productId}"]`);
      let productCount = modalBody.querySelector(`[data-product-id="${productId}"] .cart-counter__count`);
      let productPrice = modalBody.querySelector(`[data-product-id="${productId}"] .cart-product__price`);
      let infoPrice = modalBody.querySelector(`.cart-buttons__info-price`);

      productCount.innerHTML = cartItem.count;
      productPrice.innerHTML = `€${ (cartItem.product.price * cartItem.count).toFixed(2)}`;

      let productsSum = 0;
      for (let item of this.cartItems) {
        productsSum += item.product.price * item.count;
      }
      infoPrice.innerHTML = `€${ (productsSum).toFixed(2) }`;

      if (cartItem.count === 0) { // если сумма в строке 0, удалить этот товар из корзины
        product.remove();
      }

      if (productsSum === 0) { // если сумма всей корзины 0, закрыть модальное окно
        this._cartModal.close();
      }
    }
  }

  onSubmit(event, cartForm) {
    event.preventDefault();

    let url = 'https://httpbin.org/post';
    let formData = new FormData(cartForm);
    let btnSubmit = cartForm.querySelector('button[type="submit"]');
    btnSubmit.classList.add('is-loading');

    fetch(url, {
      method: 'POST',
      body: formData,
    })
        .then((response) => {
          if (response.ok) { // если пришел корректный ответ
            let modalBody = createElement(`<div class="modal__body-inner">
          <p>
            Order successful! Your order is being cooked :) <br>
            We’ll notify you about delivery time shortly.<br>
            <img src="/assets/images/delivery.gif">
          </p>
        </div>`);
            this._cartModal.setTitle('Success!');
            this._cartModal.setBody(modalBody);
            this.cartItems = [];
            this.cartIcon.update(this);
          } else {
            let modalBody = createElement(`<div class="modal__body-inner">
          <p>
            Something went wrong. Please try again later :(
          </p>
        </div>`);
            this._cartModal.setTitle('Error!');
            this._cartModal.setBody(modalBody);
          }
        });
  };

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }
}

