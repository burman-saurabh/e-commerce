import { Component, OnInit, OnDestroy } from '@angular/core';
import { OrderService } from 'shared/services/order.service';
import { AuthService } from 'shared/services/auth.service';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit, OnDestroy {
  userOrders$: any;
  // subscription: Subscription;

  constructor(
    private orderService: OrderService,
    private auth: AuthService) { }

  ngOnInit() {
    // this.subscription = this.auth.user$.subscribe(user => {
    //   let userId = user.uid;
    //   this.userOrders$ = this.orderService.getOrderByUser(userId);
    // });

    /**We can use switchmap also instead of above code*/
    this.userOrders$ = this.auth.user$.pipe(switchMap(u => this.orderService.getOrderByUser(u.uid)));
  }

  ngOnDestroy() {
    // this.subscription.unsubscribe();
  }

}
