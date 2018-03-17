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
var message_service_js_1 = require("./message.service.js");
var BasketService = (function () {
    function BasketService(message) {
        this.message = message;
        this.totalCost = 0;
        this.basketItems = new Array(); //TODO probably possible to remove it
        this.basketItemsById = {};
        this.itemsCount = 0;
    }
    BasketService.prototype.addToBasket = function (quantity, product, size) {
        if (quantity && product) {
            var cost = product.rpr * quantity;
            if (this.basketItemsById[product.id]) {
                this.basketItemsById[product.id]['cost'] += cost;
                this.basketItemsById[product.id]['quantity'] += quantity;
                for (var i = 0; i < this.basketItems.length; i++) {
                    if (product.id === this.basketItems[i].product.id) {
                        if (this.basketItems[i].quantity !== this.basketItemsById[product.id].quantity)
                            this.basketItems[i].quantity += quantity;
                        if (this.basketItems[i].cost !== this.basketItemsById[product.id].cost)
                            this.basketItems[i].cost += cost;
                    }
                }
            }
            else {
                var basketItem = {
                    quantity: quantity,
                    product: product,
                    cost: cost
                };
                this.basketItems.push(basketItem);
                this.basketItemsById[product.id] = basketItem;
            }
            this.totalCost += cost;
            this.itemsCount += quantity;
            var body = {
                totalCost: this.totalCost,
                itemsCount: this.itemsCount
            };
            this.message.sendMessage("basket-update", body);
        }
    };
    BasketService.prototype.removeFromBasket = function (newQuantity, product) {
        if (product && this.basketItemsById[product.id]) {
            if (newQuantity) {
                this.totalCost -= this.basketItemsById[product.id].cost;
                this.basketItemsById[product.id].cost = newQuantity * product.rpr;
                this.itemsCount -= this.basketItemsById[product.id].quantity;
                this.itemsCount += newQuantity;
                this.basketItemsById[product.id].quantity = newQuantity;
            }
            else {
                this.totalCost -= this.basketItemsById[product.id];
                this.itemsCount -= this.basketItemsById[product.id].quantity;
                delete this.basketItemsById[product.id];
                var index;
                for (var i = 0; i < this.basketItems.length; i++) {
                    if (this.basketItems[i].product.id === product.id) {
                        index = i;
                        break;
                    }
                }
                this.basketItems.splice(index, 1);
            }
            var body = {
                totalCost: this.totalCost,
                itemsCount: this.itemsCount
            };
            this.message.sendMessage("basket-update", body);
        }
    };
    return BasketService;
}());
BasketService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [message_service_js_1.MessageService])
], BasketService);
exports.BasketService = BasketService;
//# sourceMappingURL=basket.service.js.map