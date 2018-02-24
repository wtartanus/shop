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
var header_component_js_1 = require("./../components/header.component.js");
// import {CommonService} from './../services/common.service.js';
// import {SearchService} from './../services/search.service.js';
// import {MessageService} from './../services/message.service.js';
// import { WindowSize } from './../models/windowSize.js';
// import { Inspiration } from './../models/inspiration.js';
// declare var google: any;
var AppComponent = (function () {
    function AppComponent() {
        this.selectedCategory = null; //This should be null when in home page
        //   constructor(private commonService: CommonService, private searchService: SearchService, private messageService: MessageService) { 
        //     this.substriction = this.messageService.getMessage().subscribe(message => this.updateDates(message));
        //   };
        //   ngOnInit(): void {
        //     this.windowSize = this.commonService.getWindowSize();
        //     let input = document.getElementById('locationTextField');
        //     let autocomplete = new google.maps.places.Autocomplete(input);
        //     if (this.windowSize.getWidth() >= 1200) {
        //       this.height = '56.79px';
        //       this.width = '100%';
        //     }
        //     this.departOptions = this.setOptions(false);
        //     this.returnOptions = this.setOptions(true);
        //   }
        //   ngOnDestroy(): void {
        //      this.substriction.unsubscribe();
        //   }
    }
    AppComponent.prototype.ngOnInit = function () {
    };
    AppComponent.prototype.onCategoryChange = function (category) {
        this.selectedCategory = category;
    };
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        selector: 'my-app',
        templateUrl: 'src/app/views/app.component.html',
        // providers: [CommonService],
        entryComponents: [header_component_js_1.HeaderComponent]
    })
    // export class AppComponent implements OnInit, OnDestroy {
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map