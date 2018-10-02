import {Component, OnInit, OnDestroy} from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';


@Component({
  selector: 'splash',
  templateUrl: '../../views/splash.component.html',
  styleUrls: ['./Splash.css']
})
export class SplashComponent implements OnInit {
  ngOnInit() {
    window.scrollTo(0, 0);
  }
}
