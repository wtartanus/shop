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
var basket_service_js_1 = require("../services/basket.service.js");
var warehouse_service_js_1 = require("../services/warehouse.service.js");
var BasketComponent = (function () {
    function BasketComponent(warehouse, basket) {
        this.warehouse = warehouse;
        this.basket = basket;
    }
    ;
    BasketComponent.prototype.ngOnInit = function () {
        if (this.basket.basketItemsById) {
            this.basketItems = this.basket.basketItems;
            console.log("this.basketItems", this.basketItems);
        }
    };
    return BasketComponent;
}());
BasketComponent = __decorate([
    core_1.Component({
        selector: 'basket',
        templateUrl: 'src/app/views/basket.component.html'
    }),
    __metadata("design:paramtypes", [warehouse_service_js_1.WarehouseService, basket_service_js_1.BasketService])
], BasketComponent);
exports.BasketComponent = BasketComponent;
//# sourceMappingURL=basket.component.js.map