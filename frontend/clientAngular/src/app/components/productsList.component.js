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
    }
    ProductsListComponent.prototype.ngOnInit = function () {
        this.initShop();
        this.initPopUpBox();
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