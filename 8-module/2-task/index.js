import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';
import products from './products.js';

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {
      noNuts: null,
      vegeterianOnly: null,
      maxSpiciness: null,
      category: null
    };
    this.elem = document.createElement('div');
    this.render(products);
  }

  render(products) {
    this.elem.classList.add('products-grid');

    let productCards = products.map((product) => {
      let card = new ProductCard({
        name: product.name,
        price: product.price,
        category: product.category,
        image: product.image,
        id: product.id
      });

      return (card.elem.innerHTML);
    }).join('');

    this.elem.innerHTML = `
      <div class="products-grid__inner">
        ${productCards}
      </div>
    `;
  }

  updateFilter(filters) {
    for (let [filter, value] of Object.entries(filters)) { // бновить фильтры
      this.filters[filter] = value;
    }

    let productsFiltered = this.products;

    if (this.filters.noNuts === true) {  // применить фильтры
      productsFiltered = productsFiltered.filter((product) => product.nuts !== true);
    }

    if (this.filters.vegeterianOnly === true) {
      productsFiltered = productsFiltered.filter((product) => product.vegeterian === true);
    }

    if (this.filters.maxSpiciness !== null) {
      productsFiltered = productsFiltered.filter((product) => product.spiciness <= this.filters.maxSpiciness);
    }

    if (this.filters.category) {
      productsFiltered = productsFiltered.filter((product) => product.category === this.filters.category);
    }

    this.render(productsFiltered);  // отрисовать отфильтрованные товары
  }
}