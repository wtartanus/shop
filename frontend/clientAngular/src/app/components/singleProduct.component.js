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
var basket_service_js_1 = require("../services/basket.service.js");
// import { Subscription } from 'rxjs/Subscription';
// import 'rxjs/add/operator/toPromise';
var SingleProductComponent = (function () {
    function SingleProductComponent(warehouse, basket) {
        this.warehouse = warehouse;
        this.basket = basket;
        this.quantity = 1;
        this.reviewRanking = 5;
        this.productReviews = new Array();
        this.savingReview = false;
        this.reviewsLoaded = false;
        //public basket: BasketService;
        this.starOne = { selected: true, value: 1, id: "star-1", position: 0 };
        this.starTwo = { selected: true, value: 2, id: "star-2", position: 1 };
        this.starThree = { selected: true, value: 3, id: "star-3", position: 2 };
        this.starFour = { selected: true, value: 4, id: "star-4", position: 3 };
        this.starFive = { selected: true, value: 5, id: "star-5", position: 4 };
        this.orderedStars = new Array();
        this.itemsShowNumber = 5;
        this.pages = new Array();
        this.pagesIndex = new Array();
        //this.basket = basket;
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
    SingleProductComponent.prototype.splitProducts = function () {
        if (this.productReviews) {
            var items = [];
            for (var i = 0; i < this.productReviews.length; i++) {
                items.push(this.productReviews[i]);
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
    SingleProductComponent.prototype.createNumbersArray = function () {
        if (this.pages.length <= 10 || !this.pagesIndex.length) {
            this.pagesIndex.length = 0;
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
    SingleProductComponent.prototype.changePage = function (pageNumber) {
        this.currentPage = this.pages[pageNumber];
        this.pageSelected = pageNumber;
        this.createNumbersArray();
    };
    SingleProductComponent.prototype.getReviews = function () {
        var reviewPromise = this.warehouse.httpGet("http://localhost:8080//review/" + this.product.id);
        reviewPromise.then(function onSuccess(result) {
            if (result && result.length) {
                this.productReviews = this.productReviews.concat(result);
            }
            this.reviewsLoaded = true;
            this.calculateAverageRanking();
            this.initOrderedStars();
            this.splitProducts();
            this.currentPage = this.pages[0];
            this.pageSelected = 0;
            this.createNumbersArray();
        }.bind(this));
    };
    SingleProductComponent.prototype.calculateAverageRanking = function () {
        if (!this.productReviews || !this.productReviews.length) {
            this.averageRanking = 5;
        }
        else {
            var total = 0;
            for (var i = 0; i < this.productReviews.length; i++) {
                total += this.productReviews[i]['ranking'];
            }
            var result = total / this.productReviews.length;
            result = Math.round(result);
            this.averageRanking = result;
        }
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
            this.calculateAverageRanking();
        }.bind(this));
    };
    /**** Stars functionality* *****/
    SingleProductComponent.prototype.initOrderedStars = function () {
        this.orderedStars = [this.starOne, this.starTwo, this.starThree, this.starFour, this.starFive];
    };
    SingleProductComponent.prototype.toggleStarClass = function (selectedStar) {
        for (var i = 0; i < this.orderedStars.length; i++) {
            var star = this.orderedStars[i];
            var starElement = document.getElementById(star.id);
            if (star.position <= selectedStar.position) {
                if (!star.selected) {
                    starElement.classList.remove("far");
                    starElement.classList.add("fas");
                    star.selected = true;
                }
            }
            else {
                if (star.selected) {
                    starElement.classList.remove("fas");
                    starElement.classList.add("far");
                    star.selected = false;
                }
            }
        }
    };
    SingleProductComponent.prototype.selectRanking = function (star) {
        this.reviewRanking = star.value;
    };
    SingleProductComponent.prototype.resetStars = function () {
        for (var i = 0; i < this.orderedStars.length; i++) {
            var star = this.orderedStars[i];
            var starElement = document.getElementById(star.id);
            if (star.value <= this.reviewRanking) {
                if (!star.selected) {
                    starElement.classList.remove("far");
                    starElement.classList.add("fas");
                    star.selected = true;
                }
            }
            else {
                if (star.selected) {
                    starElement.classList.remove("fas");
                    starElement.classList.add("far");
                    star.selected = false;
                }
            }
        }
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
        providers: [warehouse_service_js_1.WarehouseService, basket_service_js_1.BasketService]
        // entryComponents: [InspirationsComponent, DatePickerComponent]
    }),
    __metadata("design:paramtypes", [warehouse_service_js_1.WarehouseService, basket_service_js_1.BasketService])
], SingleProductComponent);
exports.SingleProductComponent = SingleProductComponent;
//# sourceMappingURL=singleProduct.component.js.map