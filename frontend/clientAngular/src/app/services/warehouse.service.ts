import {Injectable} from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/toPromise';

import { MessageService } from "../services/message.service.js";


@Injectable()
export class WarehouseService {
    public http: Http;
    public data: any;

    constructor(http: Http, private message: MessageService) {
       this.http = http;
    };


    httpGet(url: string): Promise<any> {
        return this.http.get(url)
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    httpPost(url: string, msg: any): Promise<any> {
        this.http.post(url, msg);
        return this.http.post(url, msg).toPromise().then(response => { return response.json() }, this.handleError);
    }

    initData() {
       this.httpGet("http://localhost:8080/data").then(function processResult(result: any) {
          this.data = result;
          this.message.sendMessage("data-arrived", {});
       }.bind(this));
    };

    getProductsByCategory(category: string): any{
        return this.data.productsByCategory[category];
    }

    public handleError(error: any): Promise<any> {
      console.error('An error occured', error);
      return Promise.reject(error.message || error);
    };
}
