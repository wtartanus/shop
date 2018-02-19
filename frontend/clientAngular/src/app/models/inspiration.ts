import {Injectable} from '@angular/core';

import { Activity } from './../models/activity.js';
import { City } from './../models/city.js';
import { Photo } from './../models/photo.js';
import { Weather } from './../models/weather.js';

@Injectable()
export class Inspiration {
  public city: City;
  public photos: Photo[];
  public weather: Weather;
  public activities: Activity[];
  public menu: Object;
  public photoPosition: number;
  public activityPosition: number;
  public chartOptions: Object;

 public constructor(city: City, photos: Photo[], weather: Weather, activities: Activity[], width: number) {
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
           formatter: function() {
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
       title : { text : 'Avarage Year Temperatures' },
       series: [{
                data: this.setColors()
            }]
    }
  }

  setColors(): Object[]{
    let temperatures: Object[] = new Array();
   for(var i = 0; i < this.weather.temperatures.length; i++) {
     let value = this.weather.temperatures[i];
     if(value < 5) {
       temperatures.push({y: value, color: '#0000FF'});
     } else if(value >= 5 && value < 15) {
       temperatures.push({y: value, color: '#008000'});
     } else if(value >=15 && value < 25) {
       temperatures.push({y: value, color: '#FFA500'});
     } else if(value >= 25) {
       temperatures.push({y: value, color: '#EE4000'});
     }
   }
   return temperatures;
  }

}
