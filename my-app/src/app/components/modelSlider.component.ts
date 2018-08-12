import {Component, OnInit, OnDestroy} from '@angular/core';
//import {IMyOptions, IMyDateModel} from 'mydatepicker';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
declare var jquery:any;
declare var $ :any;
declare var FilmRoll:any;
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
  selector: 'model-slider',
  templateUrl: '../views/modelSlider.component.html'
  // providers: [CommonService],
  // entryComponents: [InspirationsComponent, DatePickerComponent]
})
export class ModelSliderComponent implements OnInit {


ngOnInit() {
    this.initModelSlider();
}

 initModelSlider(): void {
    (function() {
        $(function() {
            this.film_rolls || (this.film_rolls = []);
            this.film_rolls['film_roll_1'] = new FilmRoll({
                container: '#film_roll_1',
                height: 560
            });
            return true;
        });
    }).call(this);
 }
}
