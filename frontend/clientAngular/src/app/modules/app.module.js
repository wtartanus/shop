"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
// import { MyDatePickerModule } from "mydatepicker";
// import { ChartModule } from "angular2-highcharts";
var app_component_js_1 = require("./../components/app.component.js");
var header_component_js_1 = require("./../components/header.component.js");
var modelSlider_component_js_1 = require("./../components/modelSlider.component.js");
var headerSlider_component_js_1 = require("./../components/headerSlider.component.js");
var products_component_js_1 = require("./../components/products.component.js");
var singleProduct_component_js_1 = require("./../components/singleProduct.component.js");
var productsList_component_js_1 = require("./../components/productsList.component.js");
var footer_component_js_1 = require("./../components/footer.component.js");
var splash_component_js_1 = require("./../components/splash.component.js");
var basket_component_js_1 = require("./../components/basket.component.js");
var warehouse_service_js_1 = require("./../services/warehouse.service.js");
var basket_service_js_1 = require("../services/basket.service.js");
var message_service_js_1 = require("../services/message.service.js");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [
            platform_browser_1.BrowserModule,
            forms_1.FormsModule,
            http_1.HttpModule
            // MyDatePickerModule,
            // ChartModule.forRoot(require("highcharts"), require("highcharts/highcharts-3d"), require("highcharts/modules/exporting"))
        ],
        declarations: [
            app_component_js_1.AppComponent,
            header_component_js_1.HeaderComponent,
            headerSlider_component_js_1.HeaderSliderComponent,
            modelSlider_component_js_1.ModelSliderComponent,
            footer_component_js_1.FooterComponent,
            splash_component_js_1.SplashComponent,
            products_component_js_1.ProductsComponent,
            productsList_component_js_1.ProductsListComponent,
            singleProduct_component_js_1.SingleProductComponent,
            basket_component_js_1.BasketComponent
        ],
        providers: [warehouse_service_js_1.WarehouseService, message_service_js_1.MessageService, basket_service_js_1.BasketService],
        bootstrap: [app_component_js_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map