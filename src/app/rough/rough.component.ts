import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rough',
  templateUrl: './rough.component.html',
  styleUrls: ['./rough.component.css']
})
export class RoughComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  clickfn(){
    this.router.navigate(['/products']);
  }

}
