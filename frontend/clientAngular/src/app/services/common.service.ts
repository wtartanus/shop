import {Injectable} from '@angular/core';
import { WindowSize } from './../models/windowSize.js';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Inspiration } from './../models/inspiration.js';
import { Activity } from './../models/activity.js';
import { City } from './../models/city.js';
import { Photo } from './../models/photo.js';
import { Weather } from './../models/weather.js';

@Injectable()
export class CommonService {
    public http: Http;
    private windowSize = new WindowSize(window.innerWidth, window.innerHeight);
    public width = this.windowSize.getWidth();

    constructor(http: Http) {
       this.http = http;
    };

    getWindowSize(): WindowSize {
        return this.windowSize;
    };

    apiGet(url: string): Promise<any> {
      return this.http.get(url)
        .toPromise()
        .then(response => response.json())
        .catch(this.handleError);
    }

    getInspirations(): Promise<Inspiration[]> {
        return this.apiGet("http://localhost:8080/travel-guide/data/inspirations");
    };

    public handleError(error: any): Promise<any> {
      console.error('An error occured', error);
      return Promise.reject(error.message || error);
    };

    private calculateWidth(): number {
      let width: number;
      if(this.width < 1000) {
        width = this.width - 100;
      } else if (this.width > 1000 && this.width < 1500) {
        width = this.width - 400;
      } else if(this.width > 1500) {
        width = this.width - 300;
      }
      return width;
    }

    createInspirationsModel(list: any): Inspiration[]{
      let inspirations: Inspiration[] = new Array();
      for(var i = 0; i < list.length; i++) {
        let city = new City(list[i].city.id, list[i].city.city, list[i].city.history, list[i].city.description);
        let photos: Photo[] = new Array();
        for(var p = 0; p < list[i].photos.length; p++) {
          let photo = new Photo(list[i].photos[p].id, list[i].photos[p].cityId, list[i].photos[p].link);
          photos.push(photo);
        }

        let weather = new Weather(list[i].weather.temperatures.id, list[i].weather.temperatures.cityId, list[i].weather.temperatures.values);

        let activities: Activity[] = new Array();
        for(var a = 0; a < list[i].activities.length; a++) {
         let activity = new Activity(list[i].activities[a].id, list[i].activities[a].cityId, list[i].activities[a].city, list[i].activities[a].description, list[i].activities[a].photoLink, list[i].activities[a].address);
         activities.push(activity);
        }

        let width = this.calculateWidth();
        let inspiration = new Inspiration(city, photos, weather, activities, width);
        inspirations.push(inspiration)
      }
      console.debug("Inspirations: ", inspirations);
      return inspirations;
    };
}
