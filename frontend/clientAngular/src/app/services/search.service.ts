import {Injectable, Input, OnChanges} from '@angular/core';
import { WindowSize } from './../models/windowSize.js';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {CommonService} from './../services/common.service.js';
import { MessageService } from './../services/message.service.js'; 
var Cities = require("./../../../cities.js");
import 'rxjs/add/operator/toPromise';


@Injectable()
export class SearchService {
  private destination: string;
  public destinationCorrect: boolean;
  public departure: string;
  public dateFrom: Date;
  public dateTo: Date;

  @Input() private resultDescription: string;

  constructor(private http: Http, private commonService: CommonService, private messageService: MessageService) {
    this.destinationCorrect = true;
   };


  public setDestination(destination: string): void {
    this.destination = destination;
  }

  public setDeparture(departure: string): void {
    this.departure = departure;
  }

  public setDateFrom(dateFrom: Date): void {
    this.dateFrom = dateFrom;
  }

  public setDateTo(dateTo: Date): void {
    this.dateTo = dateTo;
  }

  sanitazeHtmlFromWiki(text: any) {
    let key = Object.keys(text.query.pages)[0];
    console.log("!!!", text);
    try {
      this.resultDescription = text.query.pages[key].extract.replace(/(<([^>]+)>)/ig, "");
      console.log("@@@", this.resultDescription);
    } catch (e) {
      console.log("wrong");
    }


  }

  mapCityName(city: String): String {
    city = city.split(",")[0];
    let found = false;
    for (var i = 0; i < Cities.length; i++) {
      var name = Cities[i].name;
      if (name.toLowerCase() === city.toLowerCase()) {
        found = true;
        break;
      }
    }
    this.destinationCorrect = found;
    if(!this.destinationCorrect) {
      return undefined;
    }
    if (city.indexOf(" ") > -1) {
      let afterSplit = city.split(" ");
      for (var i = 0; i < afterSplit.length; i++) {
        afterSplit[i] = afterSplit[i].charAt(0).toUpperCase() + afterSplit[i].slice(1);
      }
      city = afterSplit.join("%20");
    } else {
      city[0].toUpperCase();
    }
    return city;
  }

  getCityDescription(city: String): Promise<any> {
    city = this.mapCityName(city);
    if(city) {
      let url = "http://en.wikipedia.org/w/api.php?action=query&prop=extracts&format=json&exintro=&titles=Poland&prop=city" ;
      return this.commonService.apiGet(url);
    } else {
      //do something if city isn't correct, for sure block another searches
    }

  };

  getImages(city: String): Promise<any> {
    city = this.mapCityName(city);
    if(city) {
      let url = "https://www.googleapis.com/customsearch/v1?key=AIzaSyDcewjcNWr02P6fuioswBb5sya93AasbWc&cx=010284551349995783765:wkbvm2xpi5m&searchType=image&q=" + city;
      return this.commonService.apiGet(url);
    }
  }

  getSomething() {
    //google places
    let url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=500&type=restaurant&keyword=cruise&key=AIzaSyCicS4jktn-E7MhqLiM2vDND_YsQ1VMdUo"
    return this.commonService.apiGet(url);
  }


  processSearch(city: String) {
    this.getSomething().then(result => console.log("@@@@@",result));
    //this.getImages(city).then(result => console.log(result));
    //this.getCityDescription(city).then(result => this.sanitazeHtmlFromWiki(result));
  }

  clearMessage(): void {
    this.messageService.clearMessage();
  }
}
