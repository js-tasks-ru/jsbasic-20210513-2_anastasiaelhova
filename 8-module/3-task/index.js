export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
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

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }
}