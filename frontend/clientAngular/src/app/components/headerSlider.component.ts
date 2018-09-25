import {Component, OnInit, OnDestroy} from '@angular/core';
import {IMyOptions, IMyDateModel} from 'mydatepicker';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
declare var jquery:any;
declare var $ :any;
// import { Subscription } from 'rxjs/Subscription';
// import 'rxjs/add/operator/toPromise';

// import { InspirationsComponent } from "./../components/inspirations.component.js";
// import { DatePickerComponent } from "./../components/datepicker.component.js"

// import {CommonService} from './../services/common.service.js';
// import {SearchService} from './../services/search.service.js';
// import {MessageService} from './../services/message.service.js';
// import { WindowSize } from './../models/windowSize.js';
// import { Inspiration } from './../models/inspiration.js';
// declare var google: any;

@Component({
  selector: 'header-slider',
  templateUrl: 'src/app/views/headerSlider.component.html'
  // providers: [CommonService],
  // entryComponents: [InspirationsComponent, DatePickerComponent]
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
