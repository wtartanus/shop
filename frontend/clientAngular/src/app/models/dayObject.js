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
var DayObject = (function () {
    function DayObject(display, week, isCurrentMonth, isPast) {
        this.display = display;
        this.week = week;
        this.isCurrentMonth = isCurrentMonth;
        this.isPast = isPast;
        this.isSelected = false;
    }
    DayObject.prototype.setValue = function (value) {
        this.value = value;
    };
    DayObject.prototype.select = function () {
        this.isSelected = true;
    };
    DayObject.prototype.deselect = function () {
        this.isSelected = false;
    };
    return DayObject;
}());
DayObject = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [String, Number, Boolean, Boolean])
], DayObject);
exports.DayObject = DayObject;
//# sourceMappingURL=dayObject.js.map