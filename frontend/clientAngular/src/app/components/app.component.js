"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
// import { Subscription } from 'rxjs/Subscription';
// import 'rxjs/add/operator/toPromise';
var header_component_js_1 = require("./../components/header.component.js");
var warehouse_service_js_1 = require("./../services/warehouse.service.js");
// import {SearchService} from './../services/search.service.js';
// import {MessageService} from './../services/message.service.js';
// import { WindowSize } from './../models/windowSize.js';
// import { Inspiration } from './../models/inspiration.js';
// declare var google: any;
var AppComponent = (function () {
    function AppComponent(warehouse) {
        this.warehouse = warehouse;
        this.selectedCategory = null; //This should be null when in home page
        this.dataReceived = false;
        //this.substriction = this.messageService.getMessage().subscribe(message => this.updateDates(message));
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        var dataPromise = this.warehouse.initData();
        dataPromise.then(function (result) { return _this.onDataReceived(result); });
    };
    AppComponent.prototype.onCategoryChange = function (category) {
        this.selectedCategory = category;
        if (this.dataReceived) {
            this.selectedProduct = null;
            this.selectedProducts = this.data.productsByCategory[this.selectedCategory];
            console.log("selected", this.selectedProducts[0]);
        }
        else {
            this.selectedProducts = [];
        }
    };
    ;
    AppComponent.prototype.onDataReceived = function (data) {
        this.data = data;
        this.dataReceived = true;
        console.log("Data in place");
    };
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        selector: 'my-app',
        templateUrl: 'src/app/views/app.component.html',
        providers: [warehouse_service_js_1.WarehouseService],
        entryComponents: [header_component_js_1.HeaderComponent]
    })
    // export class AppComponent implements OnInit, OnDestroy {
    ,
    __metadata("design:paramtypes", [warehouse_service_js_1.WarehouseService])
], AppComponent);
exports.AppComponent = AppComponent;
/******* TODO
 * - add side menu
 * - add place to add reviews
 * - add ranking
 * - assure that data been loaded
 * - add page to ask if user is 18 years old
 * - hook up search
 * - add filters to products list
 * - Single product should show sizes
 * - Update home page
 * - Disable add to cart if product is out of stock
 * - Map discounted
 * - Check if basket work properly
 * - Add videos.
 * - Add basket page??
 * - Add checkout page
 * - Add new table for orders
 * - Add page to display all orders
 * ********/
//# sourceMappingURL=app.component.js.map