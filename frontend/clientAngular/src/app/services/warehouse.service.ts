import {Injectable} from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class WarehouseService {
    public http: Http;
    public data: any;

    constructor(http: Http) {
       this.http = http;
    };


    httpGet(url: string): Promise<any> {
        // const headers = new Headers();
        // headers.append('Content-Type', 'application/json');
        // headers.append('Access-Control-Allow-Origin', '*');
        // headers.append('Access-Control-Allow-Origin', 'localhost:4567');
        // const options = new RequestOptions({headers: headers});

        return this.http.get(url)
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    initData(): Promise<any>{
       return this.httpGet("http://localhost:8080/data");
    };

    public handleError(error: any): Promise<any> {
      console.error('An error occured', error);
      return Promise.reject(error.message || error);
    };
}
