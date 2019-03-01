import { ShoppingCartItem } from "./shopping-cart-item";
import { Product } from "./product";

export class ShoppingCart {
    itemsArray: ShoppingCartItem[] = [];

    constructor(public key: string, public dateCreated: Date, public items: { [productId: string]: ShoppingCartItem }) {
        for (let productId in items) {
            this.itemsArray.push(new ShoppingCartItem(productId, items[productId].product, items[productId].quantity));
        }
    }

    get totalItemsCount() {
        // debugger;
        let count = 0;
        for (let productKey in this.items) {
            count += this.items[productKey].quantity;
        }
        return count;
    }

    get totalPrice() {
        let sum = 0;
        for (let item of this.itemsArray) {
            sum += item.totalPrice;
        }
        return sum;
    }

    getQuantity(product: Product){
        let item = this.items[product.key];
        return item? item.quantity : 0;
    }

    getProductQuantity(product: Product) {
        /**In case of no product added to the cart we have a cart but items will be undefined then */
        return  this.items? (this.items[product.key] ? this.items[product.key].quantity : 0) : 0;
      }
}