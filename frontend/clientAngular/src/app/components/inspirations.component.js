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
require("rxjs/add/operator/toPromise");
var common_service_js_1 = require("./../services/common.service.js");
var InspirationsComponent = (function () {
    function InspirationsComponent(commonService) {
        this.commonService = commonService;
        this.showPhoto = false;
    }
    ;
    InspirationsComponent.prototype.ngOnInit = function () {
        this.windowSize = this.commonService.getWindowSize();
        this.getInspirations();
    };
    InspirationsComponent.prototype.getInspirations = function () {
        var _this = this;
        this.commonService.getInspirations().then(function (inspirations) { return _this.inspirations = _this.commonService.createInspirationsModel(inspirations); }).then(function () {
            this.selectedInspiration = this.inspirations[0];
        }.bind(this));
        this.selectedSideNav = "displayDescription";
    };
    InspirationsComponent.prototype.changeItem = function (moveRight, item, inspirationIndex) {
        var inspiration = inspirationIndex ? this.inspirations[inspirationIndex] : this.selectedInspiration;
        var value = item === "photoPosition" ? "photos" : "activities";
        if (moveRight) {
            var nowPosition = inspiration[item];
            nowPosition += 1;
            if (nowPosition > (inspiration[value].length - 1)) {
                nowPosition = 0;
            }
            inspiration[item] = nowPosition;
        }
        else {
            var nowPosition = inspiration[item];
            nowPosition -= 1;
            if (nowPosition < 0) {
                nowPosition = (inspiration[value].length - 1);
            }
            inspiration[item] = nowPosition;
        }
    };
    InspirationsComponent.prototype.changeDisplay = function (item, inspirationIndex) {
        var inspiration = inspirationIndex ? this.inspirations[inspirationIndex] : this.selectedInspiration;
        this.selectedSideNav = item;
        var keys = Object.keys(inspiration.menu);
        for (var i = 0; i < keys.length; i++) {
            if (inspiration.menu.hasOwnProperty(keys[i])) {
                if (keys[i] === item) {
                    inspiration.menu[keys[i]] = true;
                }
                else {
                    inspiration.menu[keys[i]] = false;
                }
            }
        }
    };
    return InspirationsComponent;
}());
InspirationsComponent = __decorate([
    core_1.Component({
        selector: 'inspirations',
        templateUrl: 'src/app/views/inspirations.component.html',
        providers: [common_service_js_1.CommonService]
    }),
    __metadata("design:paramtypes", [common_service_js_1.CommonService])
], InspirationsComponent);
exports.InspirationsComponent = InspirationsComponent;
//# sourceMappingURL=inspirations.component.js.map