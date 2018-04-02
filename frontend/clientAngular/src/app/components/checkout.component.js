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
var CheckoutComponent = (function () {
    function CheckoutComponent(basket) {
        this.basket = basket;
        this.orderConfirmed = false;
        this.delivery = "1";
        this.deliveryTypes = {
            "1": { name: "Royal Mail Second Class", cost: 2.71 },
            "2": { name: "Royal Mail First Class", cost: 2.71 },
            "3": { name: "Royal Mail Tracked48", cost: 3.28 },
            "4": { name: "Royal Mail Tracked24", cost: 4.68 },
            "5": { name: "DPD Express Next Day", cost: 5.05 },
            "6": { name: "DPD Weekend Shipping", cost: 7.10 },
            "7": { name: "Royal Mail Overnight", cost: 6.40 }
        };
    }
    CheckoutComponent.prototype.ngOnInit = function () {
        console.log("@@@", this.basket);
    };
    CheckoutComponent.prototype.proccessOrder = function () {
        this.orderConfirmed = true;
    };
    CheckoutComponent.prototype.isValid = function () {
        if (this.email && this.firstName && this.lastName && this.addressOne && this.city && this.postcode) {
            return true;
        }
        return false;
    };
    return CheckoutComponent;
}());
CheckoutComponent = __decorate([
    core_1.Component({
        selector: 'checkout',
        templateUrl: 'src/app/views/checkout.component.html'
    }),
    __metadata("design:paramtypes", [basket_service_js_1.BasketService])
], CheckoutComponent);
exports.CheckoutComponent = CheckoutComponent;
//# sourceMappingURL=checkout.component.js.map