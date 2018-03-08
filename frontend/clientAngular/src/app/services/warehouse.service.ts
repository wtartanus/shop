import {Injectable} from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/toPromise';


@Injectable()
export class WarehouseService {
    public http: Http;
    public data: any;

    constructor(http: Http) {
       this.http = http;
    };


    httpGet(url: string): Promise<any> {
        return this.http.get(url)
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    httpPost(url: string, msg: any): Promise<any> {
        console.log("@@@@@", msg, url);
        this.http.post(url, msg);
        return this.http.post(url, msg).toPromise().then(response => { return response.json() }, this.handleError);
    }

    initData(): Promise<any>{
       return this.httpGet("http://localhost:8080/data");
    };

    public handleError(error: any): Promise<any> {
      console.error('An error occured', error);
      return Promise.reject(error.message || error);
    };
}
