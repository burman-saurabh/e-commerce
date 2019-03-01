import { Component, OnInit } from '@angular/core';
import { AuthService } from 'shared/services/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public auth: AuthService, private afAuth: AngularFireAuth,
    private router: Router) {
    console.log('inside logints');
   }

  ngOnInit() {
    // console.log('inside logints init');
    // this.auth.appUser$.subscribe(user => {
    //   console.log(user, 'login');
    // });
  }

  login(){
    console.log('inside logints login method');

    // this.auth.login().then(()=> {
    //   if(this.auth.user$){
    //     console.log('after login then');
    //     let returnUrl = localStorage.getItem('returnUrl');
    //     this.router.navigateByUrl(returnUrl || '/');
    //     localStorage.setItem('returnUrl', '/'); // modified
    //   }
    // })

    this.auth.login();


    // this.afAuth.auth.getRedirectResult().then(result => {
    //   console.log('after login');
    //   if (result.user) {
    //     let returnUrl = localStorage.getItem('returnUrl');
    //     this.router.navigateByUrl(returnUrl);
    //     localStorage.setItem('returnUrl', '/'); // modified
    //  }
    // })
  }

  loginWithCredentials(formData){
    this.auth.loginWithCredentials(formData);
  }

  registerUserWithCredentials(formData){
    this.auth.registerUserWithCredentials(formData);
  }

}
