import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { UserService } from 'shared/services/user.service';
import { AppUser } from 'shared/models/app-user';
import { Observable } from 'rxjs';
import { AuthService } from 'shared/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService implements CanActivate {
  // appUsersss;

  constructor(private auth: AuthService, private userService: UserService, private router: Router) {
    // auth.appUser$.subscribe(appUser => this.appUsersss = appUser);
    // console.log(this.appUsersss);
  }

  canActivate(route, state: RouterStateSnapshot): Observable<boolean> {
    // return this.auth.user$.pipe(
    //   switchMap(user => this.userService.get(user.uid))
    //   , map((x: AppUser) => {
    //     console.log(x);
    //       if(x.isAdmin){
    //         return true;
    //       }
    //       else{
    //         this.router.navigate(['/']);
    //       }
    //   })
    // );

    //code to redirect the page after refresh for admin
    //as we see that on refresh code is not getting inside the return statements below.
    console.log('inside AdminAuthGuardService canactivate');
    // console.log(state.url);
    // this.auth.appUser$.subscribe(appUser => {
    //   if(appUser.isAdmin){
    //     localStorage.setItem('returnUrl', state.url);
    //   }
    // });
  

    return this.auth.appUser$.pipe(map((x: AppUser) => {
      // debugger;
      // console.log(x);
      if (x.isAdmin) {
        console.log('auth2');
        return true;
      }
      else {
        console.log('auth22');
        this.router.navigate(['/']);
        return false;
      }
      
    })
    );


  }
}
