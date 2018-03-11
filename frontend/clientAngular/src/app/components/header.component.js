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
var HeaderComponent = (function () {
    function HeaderComponent(basket, messageService, router) {
        var _this = this;
        this.basket = basket;
        this.messageService = messageService;
        this.router = router;
        this.onCategoryChange = new core_1.EventEmitter();
        this.basketValues = { itemsCount: 0, totalCost: 0 };
        this.itemsCount = this.basket.itemsCount;
        this.categories = [
            {
                name: "Sex Toys",
                subCategories: [
                    {
                        name: "Sex Toys For Ladies",
                        img: "images/categories/sex-toys-for-ladies.jpg"
                    },
                    {
                        name: "Sex Toys For Men",
                        img: "images/categories/sex-toys-for-men.jpg"
                    },
                    {
                        name: "Realistic Dildos and Vibes",
                        img: "images/categories/realistic-dildos-and-vibes.jpg"
                    },
                    {
                        name: "Other Dildos",
                        img: "images/categories/other-dildos.jpg"
                    },
                    {
                        name: "Glass",
                        img: "images/categories/glass.jpg"
                    },
                    {
                        name: "Anal Range",
                        img: "images/categories/anal-range.jpg"
                    },
                    {
                        name: "Sex Kits",
                        img: "images/categories/sex-kits.jpg"
                    },
                    {
                        name: "Sex Dolls",
                        img: "images/categories/sex-dolls.jpg"
                    },
                    {
                        name: "Branded Toys",
                        img: "images/categories/branded-toys.jpg"
                    }
                ]
            },
            {
                name: "Clothes",
                subCategories: [
                    {
                        name: "Babydolls",
                        img: "images/categories/babydolls.jpg"
                    },
                    {
                        name: "Basques and Corsets",
                        img: "images/categories/basques-and-corsets.jpg"
                    },
                    {
                        name: "Bodies and Playsuits",
                        img: "images/categories/bodies-and-playsuits.jpg"
                    },
                    {
                        name: "Bra Sets",
                        img: "images/categories/bra-sets.jpg"
                    },
                    {
                        name: "Dresses and Chemises",
                        img: "images/categories/dresses-and-chemises.jpg"
                    },
                    {
                        name: "Sexy Briefs",
                        img: "images/categories/sexy-briefs.jpg"
                    },
                    {
                        name: "Fantasy",
                        img: "images/categories/fantasy.jpg"
                    },
                    {
                        name: "Stockings",
                        img: "images/categories/stockings.jpg"
                    },
                    {
                        name: "Plus Size Lingerie",
                        img: "images/categories/plus-size-lingerie.jpg"
                    },
                    {
                        name: "Leather",
                        img: "images/categories/leather.jpg"
                    },
                    {
                        name: "Latex",
                        img: "images/categories/latex.jpg"
                    },
                    {
                        name: "Accessories",
                        img: "images/categories/accessories.jpg"
                    },
                    {
                        name: "Body Jewellery",
                        img: "images/categories/body-jewellery.jpg"
                    }
                ]
            },
            {
                name: "Bondage Gear",
                subCategories: [
                    {
                        name: "Restraints",
                        img: "images/categories/restraints.jpg"
                    },
                    {
                        name: "Handcuffs",
                        img: "images/categories/handcuffs.jpg"
                    },
                    {
                        name: "Whips",
                        img: "images/categories/whips.jpg"
                    },
                    {
                        name: "Collars",
                        img: "images/categories/collars.jpg"
                    },
                    {
                        name: "Gags and Bits",
                        img: "images/categories/gags-and-bits.jpg"
                    },
                    {
                        name: "Nipple Clamps",
                        img: "images/categories/nipple-clamps.jpg"
                    },
                    {
                        name: "Masks",
                        img: "images/categories/masks.jpg"
                    },
                    {
                        name: "Bondage Cock Rings",
                        img: "images/categories/bondage-cock-rings.jpg"
                    },
                    {
                        name: "Bondage Hoods",
                        img: "images/categories/bondage-hoods.jpg"
                    },
                    {
                        name: "Bondage Kits",
                        img: "images/categories/bondage-kits.jpg"
                    },
                    {
                        name: "Cock and Ball Bondage",
                        img: "images/categories/cock-and-ball-bondage.jpg"
                    },
                    {
                        name: "Electro Sex Stimulation",
                        img: "images/categories/electro-sex-stimulation.jpg"
                    },
                    {
                        name: "Fetish Fantasy Series",
                        img: "images/categories/fetish-fantasy-series.jpg"
                    },
                    {
                        name: "Large Accessories",
                        img: "images/categories/large-accessories.jpg"
                    },
                    {
                        name: "Male Chasity",
                        img: "images/categories/male-chasity.jpg"
                    },
                    {
                        name: "Medical Instruments",
                        img: "images/categories/medical-instruments.jpg"
                    },
                    {
                        name: "Paddles",
                        img: "images/categories/paddles.jpg"
                    },
                    {
                        name: "PVC Orgy Beddingk",
                        img: "images/categories/pvc-orgy-bedding.jpg"
                    }
                ]
            },
            {
                name: "Other",
                subCategories: [
                    {
                        name: "Media",
                        img: "images/categories/media.jpg"
                    },
                    {
                        name: "Games",
                        img: "images/categories/games.jpg"
                    },
                    {
                        name: "Brands",
                        img: "images/categories/novelties.jpg"
                    },
                    {
                        name: "Relaxation Zone",
                        img: "images/categories/hen-and-stag-nights.jpg"
                    },
                    {
                        name: "Hen and Stag Nights",
                        img: "images/categories/relaxation-zone.jpg"
                    },
                    {
                        name: "Lubricants",
                        img: "images/categories/lubricants.jpg"
                    },
                    {
                        name: "Condoms",
                        img: "images/categories/condoms.jpg"
                    }
                ]
            }
        ];
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
    HeaderComponent.prototype.changeCategory = function (category) {
        this.router.navigate(["/categories", category]);
    };
    HeaderComponent.prototype.goToHomePage = function () {
        this.selectedCategory = null;
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
    __metadata("design:paramtypes", [basket_service_js_1.BasketService, message_service_js_1.MessageService, router_1.Router])
], HeaderComponent);
exports.HeaderComponent = HeaderComponent;
//# sourceMappingURL=header.component.js.map