import {Component, OnInit, OnDestroy} from '@angular/core';
import {IMyOptions, IMyDateModel} from 'mydatepicker';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { ModelSliderComponent } from "./../components/modelSlider.component.js"
import { HeaderSliderComponent } from "./../components/headerSlider.component.js";

@Component({
  selector: 'splash',
  templateUrl: 'src/app/views/splash.component.html',
  entryComponents: [ModelSliderComponent, HeaderSliderComponent]
})
export class SplashComponent {

}
