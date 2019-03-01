import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from 'shared/services/auth.service';
import { map } from 'rxjs/operators';
import { AppUser } from 'shared/models/app-user';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  currentUser: AppUser;
  constructor(private auth: AuthService, private router: Router) {
  }

  
  canActivate(route, state: RouterStateSnapshot) {
    console.log('inside AuthGuardService canactivate');
    // console.log(state.url);
    //code to redirect the page after refresh for non admin
    //as we see that on refresh code is not getting inside the return statements below.
    

    return this.auth.user$.pipe(map(user => {
      // debugger;
      if(user){
        console.log('auth1');
        return true;
      }
      else{
        console.log('auth11');
        this.router.navigate(['/login'],
        { queryParams: {
            returnUrl: state.url
        }});
        return false;
      }
    }))
  }

}



