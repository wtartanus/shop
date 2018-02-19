import {Component, OnInit} from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import * as moment from 'moment/moment';

import { CommonService } from './../services/common.service.js';
import { SearchService } from './../services/search.service.js';
import { WindowSize } from './../models/windowSize.js';
import { DayObject } from './../models/dayObject.js';
import { MessageService } from './../services/message.service.js';

@Component({
  selector: 'date-picker',
  templateUrl: 'src/app/views/datepicker.component.html',
  providers: [CommonService, SearchService]
})
export class DatePickerComponent implements OnInit {
  public currentMonthMap: Map<number, DayObject[]> = new Map();
  public currentYear: Number;
  public currentMonth: string;
  public windowSize: WindowSize;
  public today: any;
  public firstDay: DayObject;
  public weeksList: string[] = new Array();
  public showCalendar: boolean;
  public dayFrom: DayObject;
  public dayTo: DayObject;
  public datesDisplay = "";

  constructor(private commonService: CommonService, private searchService: SearchService, private messageService: MessageService) { };

  ngOnInit(): void {
    this.showCalendar = false;
    this.today = moment();
    let firstDay = this.getFirstDayOfTheMonth(this.today);
    this.createMonth(firstDay); 
  }

  getFirstDayOfTheMonth(dayMoment: any):  DayObject{
    let dayOfTheMonth = dayMoment.date() - 1;
    let value = dayMoment.clone().subtract(dayOfTheMonth, "days");
    let dispaly = value.format("DD");
    let week = value.week();

    let firstDay = new DayObject(dispaly, week, true, value.isBefore(this.today));
    firstDay.setValue(value);
    return firstDay;
  }

  //used to create array of whole month, as parrameter pass name of the month
  createMonth(firstDay: DayObject): void {
    let day, week;
    let days: DayObject[] = new Array();

    this.currentMonth = firstDay.value.format("MMMM YYYY");

    days.push(firstDay);
    let run = true;
    let count = 0;
    while (run) {
      day = days[count].value.clone().add(1, 'day');
      week = day.week();
      if (days[days.length - 1].value.isSame(day, 'month')) {
         let newDay = new DayObject(day.format("DD"), week, true, day.isBefore(this.today));
         newDay.setValue(day);
         days.push(newDay);
      } else {
        run = false;
      }
      count++;
    }

    //map to current moment, key: week number, value: DayObject[]

    for(var i = 0; i < days.length; i++) {
       if(!this.currentMonthMap[days[i].week]) {
          this.currentMonthMap[days[i].week] = new Array<DayObject>();
          this.currentMonthMap[days[i].week].push(days[i]);
       } else {
         this.currentMonthMap[days[i].week].push(days[i]);
       }
    }
    
    this.populateEnds();
    if(this.weeksList) {
      this.weeksList.length = 0;
    }
    
    let keys = Object.keys(this.currentMonthMap);
    if(this.currentMonth.includes("December") && keys[0] === "1" && parseInt(keys[1]) > 2) {
     let item = keys.shift();
     keys.push(item);
    }
    for (var i = 0; i < keys.length; i++) {
      if(this.currentMonthMap.hasOwnProperty(keys[i])) {
        this.weeksList.push(keys[i]);
      }
    }
  }

  
  changeMonth(nextMonth: boolean) {
    let keys = Object.keys(this.currentMonthMap);
    let firstDay;
    
    for(var i = 0; i < keys.length; i++) {
      if(this.currentMonthMap.hasOwnProperty(keys[i])) {
        let week = this.currentMonthMap[keys[i]];
         for(var d = 0; d < week.length; d++) {
           if(week[d].isCurrentMonth) {
             firstDay = week[d];
             break;
           }
         }
          
          break;
      }
    }
    if(nextMonth) {
       firstDay.value.add(1, "M");
    } else {
       firstDay.value.subtract(1, "M");
    }

    firstDay = this.getFirstDayOfTheMonth(firstDay.value);
    this.currentMonthMap = new Map<number, DayObject[]>();
    this.createMonth(firstDay);
  } 
  
  populateEnds() {
    //get first and last week
    let firstWeek, lastWeek;
    
    let keys = Object.keys(this.currentMonthMap);
    if(this.currentMonth.includes("December") && keys[0] === "1" && parseInt(keys[1]) > 2) {
     let item = keys.shift();
     keys.push(item);
    }
    for(var i = 0; i < keys.length; i++) {
      if(this.currentMonthMap.hasOwnProperty(keys[i])) {
        if(!firstWeek) {
          firstWeek = keys[i];
        }
        lastWeek = keys[i];
      }
    }

    let firstDay = this.currentMonthMap[firstWeek][0];
    let prevDay = firstDay.value.clone().subtract(1, "day");
    let week = firstDay.week;
    let count = 0;
    while(week === firstDay.week) {
      if(count > 0) {
        prevDay = prevDay.clone().subtract(1, "day");
      }
      if(prevDay.week() === firstDay.week) {
        let newDay = new DayObject(prevDay.format("DD"), prevDay.week(), false, prevDay.isBefore(this.today));
        newDay.setValue(prevDay);
        this.currentMonthMap[firstWeek].unshift(newDay);
      }
      week = prevDay.week();
      count++;
    }
    
    let last = this.currentMonthMap[lastWeek].length - 1;
    let lastDay = this.currentMonthMap[lastWeek][last];
    let nextDay = lastDay.value.clone().add(1, "day");
    week = lastDay.week;
    count = 0;
    while(week === lastDay.week) {
      if(count > 0) {
        nextDay = nextDay.clone().add(1, "day");
      }
      if(nextDay.week() === lastDay.week) {
        let newDay = new DayObject(nextDay.format("DD"), nextDay.week(), false, nextDay.isBefore(this.today));
        newDay.setValue(nextDay);
        this.currentMonthMap[lastWeek].push(newDay);
      }
      week = nextDay.week();
      count++;
    } 
  }

  toggleCalendar(): void {
     this.showCalendar = !this.showCalendar;
  }

  public findDayInCurrentMonth(day: Date): DayObject {
    let dayMoment = moment(day);
    let result: DayObject;
    for (var i = 0; i < this.weeksList.length; i++) {
      let week = this.currentMonthMap[this.weeksList[i]];
      for (var j = 0; j < week.length; j++) {
        if(week[j].value.isSame(dayMoment, "day")) {
           result = week[j];
           break;
        }
      }
    }
   return result;
  }

  setDate(dateValue: any): void {
    let date = dateValue.value.clone().toDate();
    
    if(!this.searchService.dateFrom && !this.searchService.dateTo) {
       this.searchService.setDateFrom(date);
       this.dayFrom = dateValue;
    } else if(this.searchService.dateFrom && !this.searchService.dateTo) {
      if(date < this.searchService.dateFrom) {
        this.searchService.setDateTo(this.searchService.dateFrom);
        this.searchService.setDateFrom(date);
        this.dayFrom = dateValue;
        this.dayTo = this.findDayInCurrentMonth(this.searchService.dateTo);
        dateValue.select();
      } else if (date > this.searchService.dateFrom) {
         this.dayTo = dateValue;
         this.dayTo.select();
         this.searchService.setDateTo(date);
      }
    } else if (this.searchService.dateFrom && this.searchService.dateTo) {
         if(date > this.searchService.dateTo && date > this.searchService.dateFrom) {
             this.searchService.setDateTo(date);
             this.dayTo.deselect();
             this.dayTo = dateValue;
         } else if (date > this.searchService.dateFrom && date < this.searchService.dateTo) {
             this.searchService.setDateTo(date);
             this.dayTo.deselect();
             this.dayTo = dateValue;
         } else if (date < this.searchService.dateFrom && date < this.searchService.dateTo) {
             this.searchService.setDateFrom(date);
             this.dayFrom.deselect();
             this.dayFrom = dateValue;
         }
    }
    dateValue.select();
  
    if(this.searchService.dateFrom && this.searchService.dateTo) {
       let from = moment(this.searchService.dateFrom);
       let to = moment(this.searchService.dateTo);       
       this.datesDisplay = from.format("D/M/YYYY") + " - " + to.format("D/M/YYYY");
    } else if (this.searchService.dateFrom && !this.searchService.dateTo) {
       let from = moment(this.searchService.dateFrom);
       this.datesDisplay = from.format("D/M/YYYY")
    } else if (!this.searchService.dateFrom && this.searchService.dateTo) {
       let to = moment(this.searchService.dateTo);    
       this.datesDisplay = to.format("D/M/YYYY");       
    }
  }

  listMonths() {
    

  }

  listYears() {

  }
}
