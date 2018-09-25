import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'Privacy',
  templateUrl: '../views/Privacy.html'
})
export class Privacy implements OnInit {
  ngOnInit() {
    window.scrollTo(0, 0);
  }

  constructor(private route: ActivatedRoute, private router: Router) {
  };
}
