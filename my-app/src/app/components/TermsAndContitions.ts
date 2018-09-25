import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'TermsAndConditions',
  templateUrl: '../views/TermsAndConditions.html'
})
export class TermsAndConditions implements OnInit {
  ngOnInit() {
    window.scrollTo(0, 0);
  }

  constructor(private route: ActivatedRoute, private router: Router) {
  };
}
