import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { map } from 'rxjs/operators';
import { Product } from 'shared/models/product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  save(product){
    let x = this.db.list('/products').push(product);
    console.log(x);
  }

  getAll(){
    return this.db.list('/products').snapshotChanges().pipe( // working version 5. $key is not there now.
      map(actions => 
        actions.map(a => ({ key: a.key, ...a.payload.val() }))
      )
    );
  }

  get(id){
    return this.db.object('/products/' + id).snapshotChanges().pipe( // working version 5. $key is not there now.
      map(a => {
        let key = a.key;
        let data = a.payload.val();
        return ({key, ...data});
        // return { key: a.key, data};
        // return { key: a.key, ...a.payload.val()};

      }
    ))
  }

  // getProducts(){
  //     return this.db.list('products').snapshotChanges();
  // }

  // get(id){
  //   this.db.object('/products/' + id).snapshotChanges()
  //     .subscribe(snapshot => {
  //       console.log(snapshot);
  //     })
  // }

  // getPeople(){
  //   return new Promise<any>((resolve, reject) => {
  //     this.afs.doc('/people').snapshotChanges()
  //     .subscribe(snapshots => {
  //       resolve(snapshots)
  //     })
  //   })
  // }


  // map(a => ({ key: a.key, ...a.payload.val()})
  update(productId, product){
    return this.db.object('/products/' + productId).update(product);
  }

  delete(productId){
    return this.db.object('/products/' + productId).remove();
  }


}
