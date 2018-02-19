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
var common_service_js_1 = require("./../services/common.service.js");
var message_service_js_1 = require("./../services/message.service.js");
var Cities = require("./../../../cities.js");
require("rxjs/add/operator/toPromise");
var SearchService = (function () {
    function SearchService(http, commonService, messageService) {
        this.http = http;
        this.commonService = commonService;
        this.messageService = messageService;
        this.destinationCorrect = true;
    }
    ;
    SearchService.prototype.setDestination = function (destination) {
        this.destination = destination;
    };
    SearchService.prototype.setDeparture = function (departure) {
        this.departure = departure;
    };
    SearchService.prototype.setDateFrom = function (dateFrom) {
        this.dateFrom = dateFrom;
    };
    SearchService.prototype.setDateTo = function (dateTo) {
        this.dateTo = dateTo;
    };
    SearchService.prototype.sanitazeHtmlFromWiki = function (text) {
        var key = Object.keys(text.query.pages)[0];
        console.log("!!!", text);
        try {
            this.resultDescription = text.query.pages[key].extract.replace(/(<([^>]+)>)/ig, "");
            console.log("@@@", this.resultDescription);
        }
        catch (e) {
            console.log("wrong");
        }
    };
    SearchService.prototype.mapCityName = function (city) {
        city = city.split(",")[0];
        var found = false;
        for (var i = 0; i < Cities.length; i++) {
            var name = Cities[i].name;
            if (name.toLowerCase() === city.toLowerCase()) {
                found = true;
                break;
            }
        }
        this.destinationCorrect = found;
        if (!this.destinationCorrect) {
            return undefined;
        }
        if (city.indexOf(" ") > -1) {
            var afterSplit = city.split(" ");
            for (var i = 0; i < afterSplit.length; i++) {
                afterSplit[i] = afterSplit[i].charAt(0).toUpperCase() + afterSplit[i].slice(1);
            }
            city = afterSplit.join("%20");
        }
        else {
            city[0].toUpperCase();
        }
        return city;
    };
    SearchService.prototype.getCityDescription = function (city) {
        city = this.mapCityName(city);
        if (city) {
            var url = "http://en.wikipedia.org/w/api.php?action=query&prop=extracts&format=json&exintro=&titles=Poland&prop=city";
            return this.commonService.apiGet(url);
        }
        else {
            //do something if city isn't correct, for sure block another searches
        }
    };
    ;
    SearchService.prototype.getImages = function (city) {
        city = this.mapCityName(city);
        if (city) {
            var url = "https://www.googleapis.com/customsearch/v1?key=AIzaSyDcewjcNWr02P6fuioswBb5sya93AasbWc&cx=010284551349995783765:wkbvm2xpi5m&searchType=image&q=" + city;
            return this.commonService.apiGet(url);
        }
    };
    SearchService.prototype.getSomething = function () {
        //google places
        var url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=500&type=restaurant&keyword=cruise&key=AIzaSyCicS4jktn-E7MhqLiM2vDND_YsQ1VMdUo";
        return this.commonService.apiGet(url);
    };
    SearchService.prototype.processSearch = function (city) {
        this.getSomething().then(function (result) { return console.log("@@@@@", result); });
        //this.getImages(city).then(result => console.log(result));
        //this.getCityDescription(city).then(result => this.sanitazeHtmlFromWiki(result));
    };
    SearchService.prototype.clearMessage = function () {
        this.messageService.clearMessage();
    };
    return SearchService;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], SearchService.prototype, "resultDescription", void 0);
SearchService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http, common_service_js_1.CommonService, message_service_js_1.MessageService])
], SearchService);
exports.SearchService = SearchService;
//# sourceMappingURL=search.service.js.map