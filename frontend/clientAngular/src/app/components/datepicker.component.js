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
var moment = require("moment/moment");
var common_service_js_1 = require("./../services/common.service.js");
var search_service_js_1 = require("./../services/search.service.js");
var dayObject_js_1 = require("./../models/dayObject.js");
var message_service_js_1 = require("./../services/message.service.js");
var DatePickerComponent = (function () {
    function DatePickerComponent(commonService, searchService, messageService) {
        this.commonService = commonService;
        this.searchService = searchService;
        this.messageService = messageService;
        this.currentMonthMap = new Map();
        this.weeksList = new Array();
        this.datesDisplay = "";
    }
    ;
    DatePickerComponent.prototype.ngOnInit = function () {
        this.showCalendar = false;
        this.today = moment();
        var firstDay = this.getFirstDayOfTheMonth(this.today);
        this.createMonth(firstDay);
    };
    DatePickerComponent.prototype.getFirstDayOfTheMonth = function (dayMoment) {
        var dayOfTheMonth = dayMoment.date() - 1;
        var value = dayMoment.clone().subtract(dayOfTheMonth, "days");
        var dispaly = value.format("DD");
        var week = value.week();
        var firstDay = new dayObject_js_1.DayObject(dispaly, week, true, value.isBefore(this.today));
        firstDay.setValue(value);
        return firstDay;
    };
    //used to create array of whole month, as parrameter pass name of the month
    DatePickerComponent.prototype.createMonth = function (firstDay) {
        var day, week;
        var days = new Array();
        this.currentMonth = firstDay.value.format("MMMM YYYY");
        days.push(firstDay);
        var run = true;
        var count = 0;
        while (run) {
            day = days[count].value.clone().add(1, 'day');
            week = day.week();
            if (days[days.length - 1].value.isSame(day, 'month')) {
                var newDay = new dayObject_js_1.DayObject(day.format("DD"), week, true, day.isBefore(this.today));
                newDay.setValue(day);
                days.push(newDay);
            }
            else {
                run = false;
            }
            count++;
        }
        //map to current moment, key: week number, value: DayObject[]
        for (var i = 0; i < days.length; i++) {
            if (!this.currentMonthMap[days[i].week]) {
                this.currentMonthMap[days[i].week] = new Array();
                this.currentMonthMap[days[i].week].push(days[i]);
            }
            else {
                this.currentMonthMap[days[i].week].push(days[i]);
            }
        }
        this.populateEnds();
        if (this.weeksList) {
            this.weeksList.length = 0;
        }
        var keys = Object.keys(this.currentMonthMap);
        if (this.currentMonth.includes("December") && keys[0] === "1" && parseInt(keys[1]) > 2) {
            var item = keys.shift();
            keys.push(item);
        }
        for (var i = 0; i < keys.length; i++) {
            if (this.currentMonthMap.hasOwnProperty(keys[i])) {
                this.weeksList.push(keys[i]);
            }
        }
    };
    DatePickerComponent.prototype.changeMonth = function (nextMonth) {
        var keys = Object.keys(this.currentMonthMap);
        var firstDay;
        for (var i = 0; i < keys.length; i++) {
            if (this.currentMonthMap.hasOwnProperty(keys[i])) {
                var week = this.currentMonthMap[keys[i]];
                for (var d = 0; d < week.length; d++) {
                    if (week[d].isCurrentMonth) {
                        firstDay = week[d];
                        break;
                    }
                }
                break;
            }
        }
        if (nextMonth) {
            firstDay.value.add(1, "M");
        }
        else {
            firstDay.value.subtract(1, "M");
        }
        firstDay = this.getFirstDayOfTheMonth(firstDay.value);
        this.currentMonthMap = new Map();
        this.createMonth(firstDay);
    };
    DatePickerComponent.prototype.populateEnds = function () {
        //get first and last week
        var firstWeek, lastWeek;
        var keys = Object.keys(this.currentMonthMap);
        if (this.currentMonth.includes("December") && keys[0] === "1" && parseInt(keys[1]) > 2) {
            var item = keys.shift();
            keys.push(item);
        }
        for (var i = 0; i < keys.length; i++) {
            if (this.currentMonthMap.hasOwnProperty(keys[i])) {
                if (!firstWeek) {
                    firstWeek = keys[i];
                }
                lastWeek = keys[i];
            }
        }
        var firstDay = this.currentMonthMap[firstWeek][0];
        var prevDay = firstDay.value.clone().subtract(1, "day");
        var week = firstDay.week;
        var count = 0;
        while (week === firstDay.week) {
            if (count > 0) {
                prevDay = prevDay.clone().subtract(1, "day");
            }
            if (prevDay.week() === firstDay.week) {
                var newDay = new dayObject_js_1.DayObject(prevDay.format("DD"), prevDay.week(), false, prevDay.isBefore(this.today));
                newDay.setValue(prevDay);
                this.currentMonthMap[firstWeek].unshift(newDay);
            }
            week = prevDay.week();
            count++;
        }
        var last = this.currentMonthMap[lastWeek].length - 1;
        var lastDay = this.currentMonthMap[lastWeek][last];
        var nextDay = lastDay.value.clone().add(1, "day");
        week = lastDay.week;
        count = 0;
        while (week === lastDay.week) {
            if (count > 0) {
                nextDay = nextDay.clone().add(1, "day");
            }
            if (nextDay.week() === lastDay.week) {
                var newDay = new dayObject_js_1.DayObject(nextDay.format("DD"), nextDay.week(), false, nextDay.isBefore(this.today));
                newDay.setValue(nextDay);
                this.currentMonthMap[lastWeek].push(newDay);
            }
            week = nextDay.week();
            count++;
        }
    };
    DatePickerComponent.prototype.toggleCalendar = function () {
        this.showCalendar = !this.showCalendar;
    };
    DatePickerComponent.prototype.findDayInCurrentMonth = function (day) {
        var dayMoment = moment(day);
        var result;
        for (var i = 0; i < this.weeksList.length; i++) {
            var week = this.currentMonthMap[this.weeksList[i]];
            for (var j = 0; j < week.length; j++) {
                if (week[j].value.isSame(dayMoment, "day")) {
                    result = week[j];
                    break;
                }
            }
        }
        return result;
    };
    DatePickerComponent.prototype.setDate = function (dateValue) {
        var date = dateValue.value.clone().toDate();
        if (!this.searchService.dateFrom && !this.searchService.dateTo) {
            this.searchService.setDateFrom(date);
            this.dayFrom = dateValue;
        }
        else if (this.searchService.dateFrom && !this.searchService.dateTo) {
            if (date < this.searchService.dateFrom) {
                this.searchService.setDateTo(this.searchService.dateFrom);
                this.searchService.setDateFrom(date);
                this.dayFrom = dateValue;
                this.dayTo = this.findDayInCurrentMonth(this.searchService.dateTo);
                dateValue.select();
            }
            else if (date > this.searchService.dateFrom) {
                this.dayTo = dateValue;
                this.dayTo.select();
                this.searchService.setDateTo(date);
            }
        }
        else if (this.searchService.dateFrom && this.searchService.dateTo) {
            if (date > this.searchService.dateTo && date > this.searchService.dateFrom) {
                this.searchService.setDateTo(date);
                this.dayTo.deselect();
                this.dayTo = dateValue;
            }
            else if (date > this.searchService.dateFrom && date < this.searchService.dateTo) {
                this.searchService.setDateTo(date);
                this.dayTo.deselect();
                this.dayTo = dateValue;
            }
            else if (date < this.searchService.dateFrom && date < this.searchService.dateTo) {
                this.searchService.setDateFrom(date);
                this.dayFrom.deselect();
                this.dayFrom = dateValue;
            }
        }
        dateValue.select();
        if (this.searchService.dateFrom && this.searchService.dateTo) {
            var from = moment(this.searchService.dateFrom);
            var to = moment(this.searchService.dateTo);
            this.datesDisplay = from.format("D/M/YYYY") + " - " + to.format("D/M/YYYY");
        }
        else if (this.searchService.dateFrom && !this.searchService.dateTo) {
            var from = moment(this.searchService.dateFrom);
            this.datesDisplay = from.format("D/M/YYYY");
        }
        else if (!this.searchService.dateFrom && this.searchService.dateTo) {
            var to = moment(this.searchService.dateTo);
            this.datesDisplay = to.format("D/M/YYYY");
        }
    };
    DatePickerComponent.prototype.listMonths = function () {
    };
    DatePickerComponent.prototype.listYears = function () {
    };
    return DatePickerComponent;
}());
DatePickerComponent = __decorate([
    core_1.Component({
        selector: 'date-picker',
        templateUrl: 'src/app/views/datepicker.component.html',
        providers: [common_service_js_1.CommonService, search_service_js_1.SearchService]
    }),
    __metadata("design:paramtypes", [common_service_js_1.CommonService, search_service_js_1.SearchService, message_service_js_1.MessageService])
], DatePickerComponent);
exports.DatePickerComponent = DatePickerComponent;
//# sourceMappingURL=datepicker.component.js.map