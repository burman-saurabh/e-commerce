import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable, of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { AppUser } from 'shared/models/app-user';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<firebase.User>;

  constructor(private afAuth: AngularFireAuth, private route: ActivatedRoute,
    private router: Router, private userService: UserService) {
    console.log('inside auth svc const');
    this.user$ = afAuth.authState;
  }

  login() {
    console.log('login method');
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
    console.log(returnUrl);
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(function(){
      console.log('okkkk');
    });
  }

  registerUserWithCredentials(formData){
    console.log(formData.email);
    console.log(formData.password);
    
    this.afAuth.auth.createUserWithEmailAndPassword(formData.email, formData.password)
    .then(()=>{
      // this.router.navigate(['/']);
    })
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
      console.log(error);
    });
  }

  loginWithCredentials(formData){
    console.log('login method');
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
    console.log(returnUrl);
    
    this.afAuth.auth.signInWithEmailAndPassword(formData.email, formData.password)
    .then((x)=> {
      console.log(x);
    })
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
      console.log(error);
    });
  }

  logout() {
    this.afAuth.auth.signOut();
    console.log('logout method');
  }

  //getting AppUser observable type from the Observable of type firebase.User
  get appUser$(): Observable<AppUser> {
    console.log('inside method get appUser$ of auth service');
    return this.user$.pipe(
      switchMap((user) => {
        if (user) {
          return this.userService.get(user.uid);
        }

        return of(null);
      })
    );

  }
}
