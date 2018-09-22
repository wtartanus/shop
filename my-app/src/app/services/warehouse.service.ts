import {Injectable} from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/toPromise';

import { MessageService } from "../services/message.service.js";


@Injectable()
export class WarehouseService {
    public http: Http;
    public data: any;
    public stockByProductId: any = new Object();
    public productsByCategory: any = new Object();
    public productsById: any = new Object();
    public reviewsByProductId: any = new Object();
    public productsBySearch: any = new Object();
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
        return this.http.post(url, msg).toPromise()
                   .then(response => { return response.json() }, this.handleError);
    }

    fetchCategory(category: string): Promise<any> {
        return this.httpGet(`http://localhost:8080/category/${category}`)
                   .then(result => {
                         this.init(result, category);
                    });
    }

    init(data: any, category: string): void {
           this.productsByCategory[category] = data.products;
           this.stockByProductId = Object.assign(this.stockByProductId, data.stockByProductId);
           this.reviewsByProductId = Object.assign(this.reviewsByProductId, data.reviews);
           data.products.forEach(product => {
               if(!this.productsById[product.id]) this.productsById[product.id] = product;
           });
    }

    initData() {
       this.dataPromise = this.httpGet("http://localhost:8080/data")
       this.dataPromise.then(function processResult(result: any) {
            this.data = result;
            console.log("this.data", this.data);
            this.message.sendMessage("data-arrived", {});
        }.bind(this));
    };

    getProductById(id: number): Promise<any> {
        return this.httpGet(`http://localhost:8080/product/${id}`).then(result => {
                    this.initProduct(result);
                });
    }

    initProduct(data): void {
       this.stockByProductId[data.stockByProductId.productId] = data.stockByProductId;
       this.reviewsByProductId = Object.assign(this.reviewsByProductId, data.reviews);
       this.productsById[data.product.id] = data.product;
    }



    getProductsByCategory(category: string): any{
        return this.productsByCategory[category];
    }

    getSearchProducts(searchQuery: string): Promise<any>{
         var search = searchQuery.toLowerCase();
         return this.httpGet(`http://localhost:8080/search/${searchQuery}`).then(result => {
                    this.initSearch(result, searchQuery);
                });
         
    }

    initSearch(data: any, searchQuery: string): void {
       this.productsBySearch[searchQuery] = data.products;
       this.stockByProductId = Object.assign(this.stockByProductId, data.stockByProductId);
       this.reviewsByProductId = Object.assign(this.reviewsByProductId, data.reviews);
       data.products.forEach(product => {
           if(!this.productsById[product.id]) this.productsById[product.id] = product;
       });
    }

    public hasCategory(category: string): boolean {
      return this.productsByCategory[category] ? true : false;
    }

    public handleError(error: any): Promise<any> {
      console.error('An error occured', error);
      return Promise.reject(error.message || error);
    };
}
