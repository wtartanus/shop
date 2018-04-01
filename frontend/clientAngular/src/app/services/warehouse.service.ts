import {Injectable} from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/toPromise';

import { MessageService } from "../services/message.service.js";


@Injectable()
export class WarehouseService {
    public http: Http;
    public data: any;
    public dataPromise: Promise<any>;

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
       this.dataPromise = this.httpGet("http://localhost:8080/data")
       this.dataPromise.then(function processResult(result: any) {
            this.data = result;
            console.log("@@@@", this.data);
            this.message.sendMessage("data-arrived", {});
        }.bind(this));
    };

    getProductsByCategory(category: string): any{
        return this.data.productsByCategory[category];
    }

    getSearchProducts(searchQuery: string): any{
         var search = searchQuery.toLowerCase();
         var keys = Object.keys(this.data.productsById);
         var result = new Array();

         for (var i = 0; i < keys.length; i++) {
            if (this.data.productsById.hasOwnProperty(keys[i])) {
                 var product = this.data.productsById[keys[i]];
                 var name = product.name.toLowerCase();
                 if (name.includes(search)) {
                    result.push(product);
                    continue;
                 }

                 var brand = product.brandName.toLowerCase();

                 if (brand.includes(search)) {
                    result.push(product);
                    continue;
                 }

                 for (var j = 0; j < product.categoryName.length; j++) {
                    if (product.categoryName[j].toLowerCase().includes(search)) {
                      result.push(product);
                      break;
                    }
                 }
            }
         }

         return result;
    }

    public handleError(error: any): Promise<any> {
      console.error('An error occured', error);
      return Promise.reject(error.message || error);
    };
}
