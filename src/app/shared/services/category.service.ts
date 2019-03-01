import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { query } from '@angular/core/src/render3';
import * as firebase from 'firebase';
import { map, switchMap } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private db: AngularFireDatabase) { }

  getCategories() {

    // firebase.database().ref('/categories').orderByChild('name')
    // .on('value', function(snapshot) {
    //   console.log(snapshot.val());
    // });


    // firebase.database().ref('/categories').orderByChild('name') 

    // return this.db.list('/categories').valueChanges(); // working but now $ key is not there firebase5 version4

    // this.db.list('categories').snapshotChanges().pipe( // working version 5 without sorting.
    //   map(actions => 
    //     actions.map(a => ({ key: a.key, ...a.payload.val() }))
    //   )
    // ).subscribe(items => {
    //   // return items.map(item => item.key);
    //   console.log('okkkk');
    //   console.log(items);
    // });


    // working version 5 with sorting
    return this.db.list('categories',ref => ref.orderByChild('name')).snapshotChanges().pipe( // working version 5. $key is not there now.
      map(actions => 
        actions.map(a => ({ key: a.key, ...a.payload.val() }))
      )
    );

    // const category$ = new Subject<string>();
    // return category$.pipe(
    //   switchMap(category => 
    //     this.db.list('/category', ref =>
    //     category ? ref.orderByChild('name') : ref
    //     ).snapshotChanges()
    //   )
    // );

  }


}
