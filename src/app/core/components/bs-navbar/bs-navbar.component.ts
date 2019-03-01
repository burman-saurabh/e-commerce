import { Component, OnInit } from '@angular/core';
import { AuthService } from 'shared/services/auth.service';
import { Router } from '@angular/router';
import { AppUser } from 'shared/models/app-user';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { Observable } from 'rxjs';
import { ShoppingCart } from 'shared/models/shopping-cart';


@Component({
  selector: 'app-bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {
  appUser: AppUser;
  shoppingCartItemCount: number;
  cart$: Observable<ShoppingCart>;


  // made auth as private since we are not using it directly in the html
  // also instead of using the appUser$ observable with async pipe we
  //rather subscribed to it since that observable is getting chnaged infinitely
  //due to a switch mapping to another observable
  //So, we subscribe to the appUser$ and then use it in the html.
  constructor(private auth: AuthService, private router: Router, private shoppingCartService: ShoppingCartService) {
    console.log('inside bsnavbarts');
    
    console.log(this.appUser);
  }

  async ngOnInit() {
    this.auth.appUser$.subscribe(appUser => this.appUser = appUser);

    /**Below we have created a cart property as getCart instead of doing the calculations here
     * For that purpose we should get an observable of ShoppingCart object initialized in the 
     * cart service.
    */
    this.cart$ = await this.shoppingCartService.getCart();
  }

  logout(){
    this.auth.logout();
    this.router.navigate(['/login']);
    // this.auth.appUser$.subscribe(user => {
    //   console.log(user, 'banav');
    // });
    // console.log(this.appUser, 'after navigate');
  }

}
