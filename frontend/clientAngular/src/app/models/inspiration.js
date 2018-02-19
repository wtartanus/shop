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
var city_js_1 = require("./../models/city.js");
var weather_js_1 = require("./../models/weather.js");
var Inspiration = (function () {
    function Inspiration(city, photos, weather, activities, width) {
        this.city = city;
        this.photos = photos;
        this.weather = weather;
        this.activities = activities;
        this.photoPosition = 0;
        this.activityPosition = 0;
        this.menu = {
            displayDescription: true,
            displayActivities: false,
            displayHistory: false,
            displayWeather: false
        };
        this.chartOptions = {
            chart: {
                type: 'column',
                width: width,
                options3d: {
                    enabled: true,
                    alpha: 15,
                    beta: 15,
                    depth: 90
                }
            },
            yAxis: {
                title: {
                    text: 'Temperature'
                },
                labels: {
                    formatter: function () {
                        return this.value + 'C';
                    }
                },
            },
            xAxis: {
                title: {
                    text: 'Months'
                },
                categories: ["January ", "February", "March", "April", "May", "Jun", "July", "August", "September", "October", "November", "December"]
            },
            title: { text: 'Avarage Year Temperatures' },
            series: [{
                    data: this.setColors()
                }]
        };
    }
    Inspiration.prototype.setColors = function () {
        var temperatures = new Array();
        for (var i = 0; i < this.weather.temperatures.length; i++) {
            var value = this.weather.temperatures[i];
            if (value < 5) {
                temperatures.push({ y: value, color: '#0000FF' });
            }
            else if (value >= 5 && value < 15) {
                temperatures.push({ y: value, color: '#008000' });
            }
            else if (value >= 15 && value < 25) {
                temperatures.push({ y: value, color: '#FFA500' });
            }
            else if (value >= 25) {
                temperatures.push({ y: value, color: '#EE4000' });
            }
        }
        return temperatures;
    };
    return Inspiration;
}());
Inspiration = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [city_js_1.City, Array, weather_js_1.Weather, Array, Number])
], Inspiration);
exports.Inspiration = Inspiration;
//# sourceMappingURL=inspiration.js.map