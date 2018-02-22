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
var HeaderSliderComponent = (function () {
    function HeaderSliderComponent() {
    }
    HeaderSliderComponent.prototype.ngOnInit = function () {
        this.initHeaderSlider();
    };
    HeaderSliderComponent.prototype.initHeaderSlider = function () {
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
    };
    return HeaderSliderComponent;
}());
HeaderSliderComponent = __decorate([
    core_1.Component({
        selector: 'header-slider',
        templateUrl: 'src/app/views/headerSlider.component.html'
        // providers: [CommonService],
        // entryComponents: [InspirationsComponent, DatePickerComponent]
    })
], HeaderSliderComponent);
exports.HeaderSliderComponent = HeaderSliderComponent;
//# sourceMappingURL=headerSlider.component.js.map