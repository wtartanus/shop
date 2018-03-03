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
var ProductsComponent = (function () {
    function ProductsComponent() {
    }
    ProductsComponent.prototype.ngOnInit = function () {
    };
    ProductsComponent.prototype.ngOnChanges = function (changes) {
        this.selectedProduct = null;
        console.log("change", this.selectedCategory);
    };
    ProductsComponent.prototype.onProductSelection = function (selectedProduct) {
        this.selectedProduct = selectedProduct;
        this.productStock = this.stock[selectedProduct.id];
    };
    ProductsComponent.prototype.categorySelect = function (clearSelectedProduct) {
        this.selectedProduct = null;
    };
    ProductsComponent.prototype.initShop = function () {
        var shop = new cbpShop(document.getElementById('cbp-pgcontainer'));
    };
    ProductsComponent.prototype.initPopUpBox = function () {
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
    ProductsComponent.prototype.initCart = function () {
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
    return ProductsComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], ProductsComponent.prototype, "selectedCategory", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], ProductsComponent.prototype, "data", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], ProductsComponent.prototype, "stock", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], ProductsComponent.prototype, "selectedProduct", void 0);
ProductsComponent = __decorate([
    core_1.Component({
        selector: 'products',
        templateUrl: 'src/app/views/products.component.html'
        //entryComponents: [ProductsListComponent, SingleProductComponent]
    })
], ProductsComponent);
exports.ProductsComponent = ProductsComponent;
//# sourceMappingURL=products.component.js.map