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
var message_service_js_1 = require("../services/message.service.js");
var router_1 = require("@angular/router");
var categories_service_js_1 = require("../services/categories.service.js");
var HeaderComponent = (function () {
    function HeaderComponent(basket, messageService, router, categoriesService) {
        var _this = this;
        this.basket = basket;
        this.messageService = messageService;
        this.router = router;
        this.categoriesService = categoriesService;
        this.onCategoryChange = new core_1.EventEmitter();
        this.basketValues = { itemsCount: 0, totalCost: 0 };
        this.itemsCount = this.basket.itemsCount;
        this.searchQuery = "";
        this.categories = this.categoriesService.categoriesTree;
        this.showNavigation = false;
        this.subscription = this.messageService.getMessage().subscribe(function (message) { return _this.processMessage(message); });
    }
    HeaderComponent.prototype.processMessage = function (message) {
        if (message.text === "basket-update") {
            this.basketValues.itemsCount = message.body.itemsCount;
            this.basketValues.totalCost = message.body.totalCost;
        }
    };
    HeaderComponent.prototype.ngOnInit = function () {
        console.log("category header", this.selectedCategory);
    };
    HeaderComponent.prototype.toggleCategory = function (category) {
        if (category.$open === undefined || category.$open === null) {
            category.$open = true;
        }
        else {
            category.$open = !category.$open;
        }
    };
    HeaderComponent.prototype.closeAll = function () {
        this.showNavigation = false;
        for (var i = 0; i < this.categories.length; i++) {
            this.categories[i].$open = false;
            if (this.categories[i].subCategories) {
                var subCategories = this.categories[i].subCategories;
                for (var j = 0; j < subCategories.length; j++) {
                    subCategories[j].$open = false;
                    if (subCategories[j].subCategories) {
                        var subs = subCategories[j].subCategories;
                        for (var k = 0; k < subs.length; k++) {
                            subs[k].$open = false;
                        }
                    }
                }
            }
        }
    };
    HeaderComponent.prototype.changeCategory = function (category) {
        this.closeAll();
        this.router.navigate(["/categories", category]);
    };
    HeaderComponent.prototype.search = function () {
        this.closeAll();
        this.router.navigate(["/search", this.searchQuery]);
    };
    HeaderComponent.prototype.goToHomePage = function () {
        this.selectedCategory = null;
        this.closeAll();
        this.onCategoryChange.emit(this.selectedCategory);
    };
    return HeaderComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], HeaderComponent.prototype, "selectedCategory", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], HeaderComponent.prototype, "selectedBasket", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], HeaderComponent.prototype, "onCategoryChange", void 0);
HeaderComponent = __decorate([
    core_1.Component({
        selector: 'ng-header',
        templateUrl: 'src/app/views/header.component.html'
    }),
    __metadata("design:paramtypes", [basket_service_js_1.BasketService, message_service_js_1.MessageService, router_1.Router, categories_service_js_1.CategoriesService])
], HeaderComponent);
exports.HeaderComponent = HeaderComponent;
//# sourceMappingURL=header.component.js.map