export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.elem = document.createElement('div');
    this._steps = steps;
    this._bounds;
    this._segmentWidth; // ширина одного сегмента
    this._thumb;
    this._progress ;
    this.render(value);
    this.bindEvents();
  }

  render(initValue) {
    this.elem.classList.add('slider');

    let sliderStepsHtml = '';
    for(let i = 0; i < this._steps; i++) {
      sliderStepsHtml += `<span class='${(i === initValue)?'slider__step-active':''}'></span>`
    }

    this.elem.innerHTML = `
      <div class="slider__thumb" style="left: 0;">
        <span class="slider__value">${initValue}</span>
      </div>
      <div class="slider__progress" style="width: 0;"></div>
      <div class="slider__steps">
        ${sliderStepsHtml}
      </div>
    `;
  }

  bindEvents() {
    this.elem.onclick = (event) => {
      this.changeActiveStep(event);
    }

    let thumb = this.elem.querySelector('.slider__thumb');
    thumb.ondragstart = () => false;
    thumb.addEventListener('pointerdown', () => {
      this.drugNDrop(thumb);
    });
  }

  changeActiveStep(event) {
    if (!this._segmentWidth) { // необходимо вычислить только один раз, но после добавления элемента на страницу
      this._bounds = this.elem.getBoundingClientRect();
      this._segmentWidth = this._bounds.width / (this._steps - 1); // ширина одного сегмента  
      this._thumb = this.elem.querySelector('.slider__thumb');
      this._progress = this.elem.querySelector('.slider__progress');
    }

    let clientXClick = event.clientX;
    let closestStep = Math.round( (clientXClick - this._bounds.left) / this._segmentWidth );

    this.elem.querySelector('.slider__value').innerHTML = closestStep;
    this.elem.querySelector('.slider__step-active').classList.remove('slider__step-active');
    this.elem.querySelector('.slider__steps').querySelectorAll('span')[closestStep].classList.add('slider__step-active');

    let leftPercents = 100 / (this._steps-1) * closestStep;

    this._thumb.style.left = `${leftPercents}%`;
    this._progress.style.width = `${leftPercents}%`;

    let eventChange = new CustomEvent('slider-change', {
      detail: closestStep,
      bubbles: true
    });
    this.elem.dispatchEvent(eventChange);
  }

  drugNDrop(thumb) {
    let slider = this.elem;
    let bounds = this.elem.getBoundingClientRect();
    let steps = this._steps;
    let segmentWidth = bounds.width / (steps - 1); // ширина одного сегмента
    let progress = this.elem.querySelector('.slider__progress');

    function move(event) {
      slider.classList.add('slider_dragging');

      let { pageX, pageY } = event;
      thumb.style.left = `${pageX}px`;

      let clientXClick = event.clientX;
      let closestStep = Math.round( (clientXClick - bounds.left) / segmentWidth );
  
      slider.querySelector('.slider__value').innerHTML = closestStep;
      slider.querySelector('.slider__step-active').classList.remove('slider__step-active');
      slider.querySelector('.slider__steps').querySelectorAll('span')[closestStep].classList.add('slider__step-active');
  
      let leftPercents = 100 / (steps-1) * closestStep;
  
      thumb.style.left = `${leftPercents}%`;
      progress.style.width = `${leftPercents}%`;

    }

    document.addEventListener('pointermove', move);

    document.addEventListener('pointerup', function() {
      slider.classList.remove('slider_dragging');
      document.removeEventListener('pointermove', move);
      document.onmouseup = null;
    });

  }

}
