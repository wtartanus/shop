import {Component, OnInit, OnDestroy} from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
declare var jquery:any;
declare var $ :any;


@Component({
  selector: 'header-slider',
  templateUrl: '../views/headerSlider.component.html'
})
export class HeaderSliderComponent implements OnInit {


ngOnInit() {
    this.initHeaderSlider();
}

 initHeaderSlider(): void {
    $('#fluid_dg_wrap_4').fluid_dg({
        height: 'auto',
        loader: 'bar',
        pagination: false,
        thumbnails: true,
        hover: false,
        opacityOnGrid: false,
        imagePath: '',
        time: 4000,
        transPeriod: 2000,
    });
 }
}
