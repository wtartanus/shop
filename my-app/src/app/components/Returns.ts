import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'Returns',
  templateUrl: '../views/Returns.html'
})
export class Returns implements OnInit {
  ngOnInit() {
    window.scrollTo(0, 0);
  }

  constructor(private route: ActivatedRoute, private router: Router) {
  };
}
