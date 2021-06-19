import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
    this.elem = document.createElement('div');
    this.render();
    this.bindEvents();
  }

  render() {
    this.elem.classList.add('modal');
    this.elem.innerHTML = `
      <div class="modal__overlay"></div>
      <div class="modal__inner">
        <div class="modal__header">
          <button type="button" class="modal__close">
            <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
          </button>
          <h3 class="modal__title">
            Вот сюда нужно добавлять заголовок
          </h3>
        </div>
        <div class="modal__body">
          A сюда нужно добавлять содержимое тела модального окна
        </div>
      </div>
    `;
  }

  open() {
    let body = document.body;
    body.classList.add('is-modal-open');
    body.append(this.elem);
  }

  setTitle(title) {
    let modalTitle = this.elem.querySelector('.modal__title');
    modalTitle.innerHTML = title;
  }

  setBody(body) {
    let modalBody = this.elem.querySelector('.modal__body');
    modalBody.innerHTML = '';
    modalBody.append(body);
  }

  close() {
    this.elem.remove();
    document.body.classList.remove('is-modal-open');
  }

  bindEvents() {
    let btnModalClose = this.elem.querySelector('.modal__close');
    btnModalClose.onclick = () => {
      this.close();
    };

    document.onkeydown = (event) => {
      if (event.code === 'Escape') {
        this.close();
      }
    }
  }

}
