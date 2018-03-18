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
var warehouse_service_js_1 = require("../services/warehouse.service.js");
var basket_service_js_1 = require("../services/basket.service.js");
var message_service_js_1 = require("../services/message.service.js");
var router_1 = require("@angular/router");
var ProductsListComponent = (function () {
    function ProductsListComponent(message, warehouse, basket, route, router) {
        this.message = message;
        this.warehouse = warehouse;
        this.basket = basket;
        this.route = route;
        this.router = router;
        this.itemsShowNumber = 15;
        this.pages = new Array();
        this.pagesIndex = new Array();
        this.loading = true;
    }
    ProductsListComponent.prototype.ngOnInit = function () {
        this.getProducts();
        this.getSearchProducts();
        this.splitProducts();
        this.currentPage = this.pages[0];
        this.pageSelected = 0;
        this.createNumbersArray();
    };
    ProductsListComponent.prototype.getProducts = function () {
        var _this = this;
        this.route.params
            .subscribe(function (value) {
            var category = _this.route.snapshot.paramMap.get('category');
            if (category) {
                if (!_this.warehouse.data) {
                    _this.warehouse.dataPromise.then(function onSuccess() {
                        this.products = this.warehouse.getProductsByCategory(category);
                        this.categoryChange();
                        this.loading = false;
                    }.bind(_this));
                }
                else {
                    _this.products = _this.warehouse.getProductsByCategory(category);
                    _this.categoryChange();
                    _this.loading = false;
                }
            }
        });
    };
    ProductsListComponent.prototype.getSearchProducts = function () {
        var _this = this;
        this.route.params
            .subscribe(function (value) {
            var searchQuery = _this.route.snapshot.paramMap.get('searchQuery');
            if (searchQuery) {
                if (!_this.warehouse.data) {
                    _this.warehouse.dataPromise.then(function onSuccess() {
                        this.products = this.warehouse.getSearchProducts(searchQuery);
                        this.categoryChange();
                        this.loading = false;
                    }.bind(_this));
                }
                else {
                    _this.products = _this.warehouse.getSearchProducts(searchQuery);
                    _this.categoryChange();
                    _this.loading = false;
                }
            }
        });
    };
    ProductsListComponent.prototype.categoryChange = function () {
        this.pages.length = 0;
        this.splitProducts();
        if (this.currentPage) {
            this.currentPage.length = 0;
        }
        this.currentPage = this.pages[0];
        this.pageSelected = 0;
        this.createNumbersArray();
    };
    ProductsListComponent.prototype.splitProducts = function () {
        if (this.products) {
            var items = [];
            for (var i = 0; i < this.products.length; i++) {
                items.push(this.products[i]);
                if (items.length === this.itemsShowNumber) {
                    var itemsCopy = Object.assign([], items);
                    this.pages.push(itemsCopy);
                    items.length = 0;
                }
            }
            if (items.length) {
                this.pages.push(items);
            }
        }
    };
    ProductsListComponent.prototype.createNumbersArray = function () {
        if (this.pages.length <= 10 && !this.pagesIndex.length) {
            for (var i = 0; i < this.pages.length; i++) {
                this.pagesIndex.push(i);
            }
        }
        else if ((this.pageSelected === 0) || (this.pageSelected - 9 <= 0 && this.pageSelected !== this.pagesIndex[this.pagesIndex.length - 1])) {
            this.pagesIndex.length = 0;
            for (var i = 0; i < 10; i++) {
                this.pagesIndex.push(i);
            }
        }
        else if ((this.pageSelected === this.pages.length - 1) || (this.pageSelected + 10 >= this.pages.length - 1 && this.pageSelected !== this.pagesIndex[0])) {
            this.pagesIndex.length = 0;
            for (var i = this.pages.length - 11; i < this.pages.length; i++) {
                this.pagesIndex.push(i);
            }
        }
        else {
            this.pagesIndex.length = 0;
            var end = (this.pageSelected - 4) + 11;
            for (var i = this.pageSelected - 4; i < end; i++) {
                this.pagesIndex.push(i);
            }
        }
    };
    ProductsListComponent.prototype.changePage = function (pageNumber) {
        this.currentPage = this.pages[pageNumber];
        this.pageSelected = pageNumber;
        this.createNumbersArray();
    };
    ProductsListComponent.prototype.goToStartEnd = function (goToStart) {
        if (goToStart) {
            this.currentPage = this.pages[0];
            this.pageSelected = 0;
        }
        else {
            this.currentPage = this.pages[this.pages.length - 1];
            this.pageSelected = this.pages.length - 1;
        }
        this.createNumbersArray();
    };
    ProductsListComponent.prototype.moveByOnePage = function (goLeft) {
        if (goLeft) {
            if (this.pageSelected) {
                this.pageSelected--;
                this.currentPage = this.pages[this.pageSelected];
            }
        }
        else {
            if (this.pageSelected !== this.pages.length - 1) {
                this.pageSelected++;
                this.currentPage = this.pages[this.pageSelected];
            }
        }
        this.createNumbersArray();
    };
    ProductsListComponent.prototype.selectProduct = function (product) {
        // this.selectedProduct = product;
        this.router.navigate(["/product", product.id]);
        // this.onProductSelection.emit(this.selectedProduct);
    };
    return ProductsListComponent;
}());
ProductsListComponent = __decorate([
    core_1.Component({
        selector: 'productsList',
        templateUrl: 'src/app/views/productsList.component.html'
    }),
    __metadata("design:paramtypes", [message_service_js_1.MessageService, warehouse_service_js_1.WarehouseService, basket_service_js_1.BasketService, router_1.ActivatedRoute, router_1.Router])
], ProductsListComponent);
exports.ProductsListComponent = ProductsListComponent;
//# sourceMappingURL=productsList.component.js.map