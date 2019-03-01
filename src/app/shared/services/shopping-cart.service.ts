import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Product } from 'shared/models/product';
import { map } from 'rxjs/operators';
import 'rxjs/add/operator/take';
import { ShoppingCartItem } from 'shared/models/shopping-cart-item';
import { ShoppingCart } from 'shared/models/shopping-cart';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  private createCartId() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    })
  }

  async getCart() {
    let cartId = await this.getOrCreateCardId();
    return this.db.object('/shopping-carts/' + cartId).snapshotChanges().pipe(
      map(a => {
        let key = a.key;
        let data = a.payload.val();

        let shoppingCart = ({ key, ...data }) as ShoppingCart;
        console.log(shoppingCart.items);
        // let itemsArray = new Array();
        // for(let i in shoppingCart.items){
        //   itemsArray.push(shoppingCart.items[i]);
        // }
        // return new ShoppingCart(key, itemsArray);
        return new ShoppingCart(shoppingCart.key, shoppingCart.dateCreated, shoppingCart.items);

        /**In case we dont need the cart instamce below can be used*/
        // return ({ key, ...data }) as ShoppingCart;
      }
      ));
  }

  private async getOrCreateCardId() {
    let cartId = localStorage.getItem('cartId');
    if (cartId) return cartId;

    let result = await this.createCartId();
    console.log(result);
    localStorage.setItem('cartId', result.key);
    return result.key;
  }

  async addToCart(product: Product) {
    this.updateItemQuantity(product, 1);
  }

  async removeFromCart(product) {
    this.updateItemQuantity(product, -1);
  }

  async clearShoppingCart(){
    let cartId = await this.getOrCreateCardId();
    this.db.object('/shopping-carts/' + cartId + '/items/').remove();
  }

  private async updateItemQuantity(product: Product, change: number) {
    let cartId = await this.getOrCreateCardId();
    this.db.object('/shopping-carts/' + cartId + '/items/' + product.key).snapshotChanges().pipe(
      map(a => {
        let key = a.key;
        let data = a.payload.val();
        return ({ key, ...data } as ShoppingCartItem);
      }
      )).take(1).subscribe((item) => {
        console.log(item);
        if (item.key) { // if product is already there in db with its key else key will be null
          if(item.quantity + change === 0){
            this.db.object('/shopping-carts/' + cartId + '/items/' + product.key).remove();
          }
          else{
            this.db.object('/shopping-carts/' + cartId + '/items/' + product.key).update({ quantity: item.quantity + change });
          }
          
        }
        else {
          this.db.object('/shopping-carts/' + cartId + '/items/' + product.key).set({ product: product, quantity: change });
        }
      });
  }


}
