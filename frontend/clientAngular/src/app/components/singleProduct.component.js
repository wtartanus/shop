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
var warehouse_service_js_1 = require("./../services/warehouse.service.js");
// import { Subscription } from 'rxjs/Subscription';
// import 'rxjs/add/operator/toPromise';
var SingleProductComponent = (function () {
    function SingleProductComponent(warehouse) {
        this.warehouse = warehouse;
        this.reviewRanking = 5;
        this.productReviews = new Array();
        this.savingReview = false;
    }
    SingleProductComponent.prototype.ngOnInit = function () {
        this.currentImage = this.product.xlImage2 && this.product.xlImage2 !== '{}' ? this.product.xlImage2 : this.product.image;
        // this.initShop();
        // this.initPopUpBox();
        this.initSome();
        this.getReviews();
        console.log("product", this.product);
        console.log("stock", this.productStock);
    };
    ;
    SingleProductComponent.prototype.getReviews = function () {
        var reviewPromise = this.warehouse.httpGet("http://localhost:8080//review/" + this.product.id);
        reviewPromise.then(function onSuccess(result) {
            if (result && result.length) {
                this.productReviews = this.productReviews.concat(result);
            }
        }.bind(this));
    };
    SingleProductComponent.prototype.initShop = function () {
        var shop = new cbpShop(document.getElementById('cbp-pgcontainer'));
    };
    SingleProductComponent.prototype.changeImage = function (image) {
        this.currentImage = image;
    };
    SingleProductComponent.prototype.convertString = function (item) {
        var parsedItem = JSON.parse(item);
        if (Array.isArray(parsedItem)) {
            return parsedItem[0];
        }
        else {
            return parsedItem;
        }
    };
    SingleProductComponent.prototype.addReview = function () {
        this.savingReview = true;
        var msg = {
            name: this.reviewName,
            ranking: this.reviewRanking,
            text: this.reviewText,
            productId: this.product.id
        };
        var reviewPromise = this.warehouse.httpPost("http://localhost:8080/review", msg);
        reviewPromise.then(function reviewAdded(result) {
            this.productReviews.push(result[0]);
            this.savingReview = false;
            this.reviewName = "";
            this.reviewText = "";
            this.reviewRanking = 5;
        }.bind(this));
    };
    SingleProductComponent.prototype.initSome = function () {
        $(window).load(function () {
            $('.flexslider').flexslider({
                animation: "slide",
                controlNav: "thumbnails"
            });
        });
    };
    SingleProductComponent.prototype.initPopUpBox = function () {
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
    SingleProductComponent.prototype.initCart = function () {
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
    return SingleProductComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], SingleProductComponent.prototype, "data", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], SingleProductComponent.prototype, "product", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], SingleProductComponent.prototype, "productStock", void 0);
SingleProductComponent = __decorate([
    core_1.Component({
        selector: 'singleProduct',
        templateUrl: 'src/app/views/singleProduct.component.html',
        providers: [warehouse_service_js_1.WarehouseService]
        // entryComponents: [InspirationsComponent, DatePickerComponent]
    }),
    __metadata("design:paramtypes", [warehouse_service_js_1.WarehouseService])
], SingleProductComponent);
exports.SingleProductComponent = SingleProductComponent;
//# sourceMappingURL=singleProduct.component.js.map