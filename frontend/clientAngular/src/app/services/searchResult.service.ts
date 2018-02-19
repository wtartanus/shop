import {Injectable, Input, OnChanges} from '@angular/core';
import { WindowSize } from './../models/windowSize.js';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {CommonService} from './../services/common.service.js';
import {SearchService} from './../services/search.service.js';
import 'rxjs/add/operator/toPromise';

export class SearchResultService {
  private descripton: string;
  private photos: Array<string>;
  private weather: Array<number>;
  private activities: Array<any>; //this will need activites models
  private hotels: Array<any>; //this will need hotels models
  private diningDrinking: Array<any>; //this will need model for dining and drinking
}
