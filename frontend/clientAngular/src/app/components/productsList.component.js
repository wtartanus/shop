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
var ProductsListComponent = (function () {
    function ProductsListComponent() {
        this.onProductSelection = new core_1.EventEmitter();
        this.itemsShowNumber = 15;
        this.pages = new Array();
        this.pagesIndex = new Array();
    }
    ProductsListComponent.prototype.ngOnInit = function () {
        this.initShop();
        this.initPopUpBox();
        this.splitProducts();
        this.currentPage = this.pages[0];
        this.pageSelected = 0;
        this.createNumbersArray();
        console.log("splited products: ", this.pages);
        console.log("pagesIndex", this.pagesIndex);
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
        this.selectedProduct = product;
        this.onProductSelection.emit(this.selectedProduct);
    };
    ProductsListComponent.prototype.initShop = function () {
        var shop = new cbpShop(document.getElementById('cbp-pgcontainer'));
    };
    ProductsListComponent.prototype.initPopUpBox = function () {
        $(document).ready(function () {
            $('.popup-with-zoom-anim').magnificPopup({
                type: 'inline',
                fixedContentPos: false,
                fixedBgPos: true,
                overflowY: 'auto',
                closeBtnInside: true,
                preloader: false,
                midClick: true,
                removalDelay: 300,
                mainClass: 'my-mfp-zoom-in'
            });
        });
    };
    ProductsListComponent.prototype.initCart = function () {
        //TODO maybe not needed
        w3l.render();
        w3l.cart.on('w3agile_checkout', function (evt) {
            var items, len, i;
            if (this.subtotal() > 0) {
                items = this.items();
                for (i = 0, len = items.length; i < len; i++) {
                }
            }
        });
    };
    return ProductsListComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], ProductsListComponent.prototype, "selectedCategory", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], ProductsListComponent.prototype, "products", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], ProductsListComponent.prototype, "onProductSelection", void 0);
ProductsListComponent = __decorate([
    core_1.Component({
        selector: 'productsList',
        templateUrl: 'src/app/views/productsList.component.html'
        // entryComponents: [InspirationsComponent, DatePickerComponent]
    })
], ProductsListComponent);
exports.ProductsListComponent = ProductsListComponent;
//# sourceMappingURL=productsList.component.js.map