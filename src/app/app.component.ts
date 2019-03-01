import { Component } from '@angular/core';
import { AuthService } from 'shared/services/auth.service';
import { Router } from '@angular/router';
import { load } from '@angular/core/src/render3';
import { UserService } from 'shared/services/user.service';
import * as firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private auth: AuthService, router: Router, private userService: UserService){

    this.auth.user$.subscribe(user => {
      if(user){
        this.userService.save(user);
        console.log('inside appcomp construtor');
        console.log(user);
        let returnUrl = localStorage.getItem('returnUrl');
        
        if(returnUrl){
          localStorage.removeItem('returnUrl'); // removed after read
          router.navigateByUrl(returnUrl);
        }else if(returnUrl === '/'){
          router.navigate(['/products']);
        }
      }
    })
  }
}
