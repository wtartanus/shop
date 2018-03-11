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
var products_component_js_1 = require("./../components/products.component.js");
var splash_component_js_1 = require("./../components/splash.component.js");
var footer_component_js_1 = require("./../components/footer.component.js");
var basket_component_js_1 = require("./../components/basket.component.js");
var warehouse_service_js_1 = require("./../services/warehouse.service.js");
var message_service_js_1 = require("./../services/message.service.js");
var basket_service_js_1 = require("./../services/basket.service.js");
// import { WindowSize } from './../models/windowSize.js';
// import { Inspiration } from './../models/inspiration.js';
// declare var google: any;
var AppComponent = (function () {
    function AppComponent(warehouse, message) {
        var _this = this;
        this.warehouse = warehouse;
        this.message = message;
        this.selectedCategory = null; //This should be null when in home page
        this.dataReceived = false;
        this.selectedBasket = false;
        this.subscription = this.message.getMessage().subscribe(function (message) { return _this.processMessage(message); });
    }
    AppComponent.prototype.ngOnInit = function () {
        var dataPromise = this.warehouse.initData();
    };
    AppComponent.prototype.onCategoryChange = function (category) {
        //this should be in selected product
        if (this.dataReceived) {
            this.selectedCategory = category;
            this.selectedProduct = null;
            this.selectedProducts = this.data.productsByCategory[this.selectedCategory];
            console.log("selected", this.selectedProducts[0]);
        }
        else {
            this.selectedProducts = [];
        }
    };
    AppComponent.prototype.renderBasket = function () {
        this.selectedProducts = null;
        this.selectedProduct = null;
        this.selectedBasket = true;
    };
    ;
    AppComponent.prototype.processMessage = function (message) {
        if (message.text === "data-arrived") {
            this.dataReceived = true;
            console.log("Data in place");
        }
    };
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        selector: 'my-app',
        templateUrl: 'src/app/views/app.component.html',
        providers: [warehouse_service_js_1.WarehouseService, message_service_js_1.MessageService, basket_service_js_1.BasketService],
        entryComponents: [header_component_js_1.HeaderComponent, products_component_js_1.ProductsComponent, splash_component_js_1.SplashComponent, footer_component_js_1.FooterComponent, basket_component_js_1.BasketComponent]
    })
    // export class AppComponent implements OnInit, OnDestroy {
    ,
    __metadata("design:paramtypes", [warehouse_service_js_1.WarehouseService, message_service_js_1.MessageService])
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map