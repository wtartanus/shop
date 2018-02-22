"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
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
var ModelSliderComponent = (function () {
    function ModelSliderComponent() {
    }
    ModelSliderComponent.prototype.ngOnInit = function () {
        this.initModelSlider();
    };
    ModelSliderComponent.prototype.initModelSlider = function () {
        (function () {
            $(function () {
                this.film_rolls || (this.film_rolls = []);
                this.film_rolls['film_roll_1'] = new FilmRoll({
                    container: '#film_roll_1',
                    height: 560
                });
                return true;
            });
        }).call(this);
    };
    return ModelSliderComponent;
}());
ModelSliderComponent = __decorate([
    core_1.Component({
        selector: 'model-slider',
        templateUrl: 'src/app/views/modelSlider.component.html'
        // providers: [CommonService],
        // entryComponents: [InspirationsComponent, DatePickerComponent]
    })
], ModelSliderComponent);
exports.ModelSliderComponent = ModelSliderComponent;
//# sourceMappingURL=modelSlider.component.js.map