import {Component, OnInit, OnDestroy} from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
declare var jquery:any;
declare var $ :any;
declare var FilmRoll:any;


@Component({
  selector: 'model-slider',
  templateUrl: '../views/modelSlider.component.html'
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
