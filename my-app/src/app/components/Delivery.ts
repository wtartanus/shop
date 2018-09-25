import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'Delivery',
  templateUrl: '../views/Delivery.html'
})
export class Delivery implements OnInit {
  ngOnInit() {
    window.scrollTo(0, 0);
  }

  constructor(private route: ActivatedRoute, private router: Router) {
  };
}
