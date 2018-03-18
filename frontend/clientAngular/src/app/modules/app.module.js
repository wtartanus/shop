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
var router_1 = require("@angular/router");
var app_component_js_1 = require("./../components/app.component.js");
var header_component_js_1 = require("./../components/header.component.js");
var modelSlider_component_js_1 = require("./../components/modelSlider.component.js");
var headerSlider_component_js_1 = require("./../components/headerSlider.component.js");
var singleProduct_component_js_1 = require("./../components/singleProduct.component.js");
var productsList_component_js_1 = require("./../components/productsList.component.js");
var footer_component_js_1 = require("./../components/footer.component.js");
var splash_component_js_1 = require("./../components/splash.component.js");
var basket_component_js_1 = require("./../components/basket.component.js");
var warehouse_service_js_1 = require("./../services/warehouse.service.js");
var basket_service_js_1 = require("../services/basket.service.js");
var message_service_js_1 = require("../services/message.service.js");
var appRoutes = [
    { path: '', component: splash_component_js_1.SplashComponent },
    { path: 'basket', component: basket_component_js_1.BasketComponent },
    { path: 'categories/:category', component: productsList_component_js_1.ProductsListComponent },
    { path: 'search/:searchQuery', component: productsList_component_js_1.ProductsListComponent },
    { path: 'product/:id', component: singleProduct_component_js_1.SingleProductComponent }
];
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [
            router_1.RouterModule.forRoot(appRoutes, { enableTracing: false } // <-- debugging purposes only
            ),
            platform_browser_1.BrowserModule,
            forms_1.FormsModule,
            http_1.HttpModule
        ],
        declarations: [
            app_component_js_1.AppComponent,
            header_component_js_1.HeaderComponent,
            headerSlider_component_js_1.HeaderSliderComponent,
            modelSlider_component_js_1.ModelSliderComponent,
            footer_component_js_1.FooterComponent,
            splash_component_js_1.SplashComponent,
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