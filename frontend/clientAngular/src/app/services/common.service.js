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
var windowSize_js_1 = require("./../models/windowSize.js");
var http_1 = require("@angular/http");
require("rxjs/add/operator/toPromise");
var inspiration_js_1 = require("./../models/inspiration.js");
var activity_js_1 = require("./../models/activity.js");
var city_js_1 = require("./../models/city.js");
var photo_js_1 = require("./../models/photo.js");
var weather_js_1 = require("./../models/weather.js");
var CommonService = (function () {
    function CommonService(http) {
        this.windowSize = new windowSize_js_1.WindowSize(window.innerWidth, window.innerHeight);
        this.width = this.windowSize.getWidth();
        this.http = http;
    }
    ;
    CommonService.prototype.getWindowSize = function () {
        return this.windowSize;
    };
    ;
    CommonService.prototype.apiGet = function (url) {
        return this.http.get(url)
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    CommonService.prototype.getInspirations = function () {
        return this.apiGet("http://localhost:8080/travel-guide/data/inspirations");
    };
    ;
    CommonService.prototype.handleError = function (error) {
        console.error('An error occured', error);
        return Promise.reject(error.message || error);
    };
    ;
    CommonService.prototype.calculateWidth = function () {
        var width;
        if (this.width < 1000) {
            width = this.width - 100;
        }
        else if (this.width > 1000 && this.width < 1500) {
            width = this.width - 400;
        }
        else if (this.width > 1500) {
            width = this.width - 300;
        }
        return width;
    };
    CommonService.prototype.createInspirationsModel = function (list) {
        var inspirations = new Array();
        for (var i = 0; i < list.length; i++) {
            var city = new city_js_1.City(list[i].city.id, list[i].city.city, list[i].city.history, list[i].city.description);
            var photos = new Array();
            for (var p = 0; p < list[i].photos.length; p++) {
                var photo = new photo_js_1.Photo(list[i].photos[p].id, list[i].photos[p].cityId, list[i].photos[p].link);
                photos.push(photo);
            }
            var weather = new weather_js_1.Weather(list[i].weather.temperatures.id, list[i].weather.temperatures.cityId, list[i].weather.temperatures.values);
            var activities = new Array();
            for (var a = 0; a < list[i].activities.length; a++) {
                var activity = new activity_js_1.Activity(list[i].activities[a].id, list[i].activities[a].cityId, list[i].activities[a].city, list[i].activities[a].description, list[i].activities[a].photoLink, list[i].activities[a].address);
                activities.push(activity);
            }
            var width = this.calculateWidth();
            var inspiration = new inspiration_js_1.Inspiration(city, photos, weather, activities, width);
            inspirations.push(inspiration);
        }
        console.debug("Inspirations: ", inspirations);
        return inspirations;
    };
    ;
    return CommonService;
}());
CommonService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], CommonService);
exports.CommonService = CommonService;
//# sourceMappingURL=common.service.js.map