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
var http_1 = require("@angular/http");
require("rxjs/add/operator/toPromise");
var message_service_js_1 = require("../services/message.service.js");
var WarehouseService = (function () {
    function WarehouseService(http, message) {
        this.message = message;
        this.http = http;
    }
    ;
    WarehouseService.prototype.httpGet = function (url) {
        return this.http.get(url)
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    WarehouseService.prototype.httpPost = function (url, msg) {
        this.http.post(url, msg);
        return this.http.post(url, msg).toPromise().then(function (response) { return response.json(); }, this.handleError);
    };
    WarehouseService.prototype.initData = function () {
        this.dataPromise = this.httpGet("http://localhost:8080/data");
        this.dataPromise.then(function processResult(result) {
            this.data = result;
            console.log("this.data", this.data);
            this.message.sendMessage("data-arrived", {});
        }.bind(this));
    };
    ;
    WarehouseService.prototype.getProductsByCategory = function (category) {
        return this.data.productsByCategory[category];
    };
    WarehouseService.prototype.getSearchProducts = function (searchQuery) {
        var search = searchQuery.toLowerCase();
        var keys = Object.keys(this.data.productsById);
        var result = new Array();
        for (var i = 0; i < keys.length; i++) {
            if (this.data.productsById.hasOwnProperty(keys[i])) {
                var product = this.data.productsById[keys[i]];
                var name = product.name.toLowerCase();
                if (name.includes(search)) {
                    result.push(product);
                    continue;
                }
                var brand = product.brandName.toLowerCase();
                if (brand.includes(search)) {
                    result.push(product);
                    continue;
                }
                for (var j = 0; j < product.categoryName.length; j++) {
                    if (product.categoryName[j].toLowerCase().includes(search)) {
                        result.push(product);
                        break;
                    }
                }
            }
        }
        return result;
    };
    WarehouseService.prototype.handleError = function (error) {
        console.error('An error occured', error);
        return Promise.reject(error.message || error);
    };
    ;
    return WarehouseService;
}());
WarehouseService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http, message_service_js_1.MessageService])
], WarehouseService);
exports.WarehouseService = WarehouseService;
//# sourceMappingURL=warehouse.service.js.map