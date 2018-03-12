import {Component, OnInit, OnDestroy, Input} from '@angular/core';
import {IMyOptions, IMyDateModel} from 'mydatepicker';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import {WarehouseService} from './../services/warehouse.service.js';
import { BasketService } from '../services/basket.service.js';
import { MessageService } from '../services/message.service.js';

declare var jquery:any;
declare var $ :any;
declare var cbpShop: any;
declare var w3l: any;
// import { Subscription } from 'rxjs/Subscription';
// import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'singleProduct',
  templateUrl: 'src/app/views/singleProduct.component.html'
  // entryComponents: [InspirationsComponent, DatePickerComponent]
})
export class SingleProductComponent implements OnInit {
  public product: any;
  public productStock: any;
  public currentImage: any;
  public reviewName: string;
  public reviewText: string;
  public quantity: number = 1;
  public reviewRanking: number = 5;
  public productReviews: Array<any> = new Array();
  public savingReview: boolean = false;
  public reviewsLoaded: boolean = false;
  public averageRanking: number;

  public starOne: any = {selected: true, value: 1, id: "star-1", position: 0};
  public starTwo: any = {selected: true, value: 2, id: "star-2", position: 1};
  public starThree: any = {selected: true, value: 3, id: "star-3", position: 2};
  public starFour: any = {selected: true, value: 4, id: "star-4", position: 3};
  public starFive: any = {selected: true, value: 5, id: "star-5", position: 4};
  public orderedStars: Array<any> = new Array();

  public itemsShowNumber: number = 5;
  public currentPage: any;
  private pages: Array<any> = new Array();
  public pagesIndex: Array<number> = new Array();
  public pageSelected: number;

  ngOnInit() {
    this.getProduct();
    this.currentImage = this.product.xlImage2 && this.product.xlImage2 !== '{}' ? this.product.xlImage2 : this.product.image;
    this.getReviews();
    console.log("product", this.product);
    console.log("stock", this.productStock);
  }

  getProduct(): void{
    this.route.params
      .subscribe((value) => {
        let productId = this.route.snapshot.paramMap.get('id');
        this.product = this.warehouse.data.productsById[productId];
        this.productStock = this.warehouse.data.stockByProductsId[productId];
    });
  }

  constructor(private warehouse: WarehouseService, public basket: BasketService, private route: ActivatedRoute, private router: Router) {
    //this.basket = basket;
  };

  splitProducts(): void{
    if (this.productReviews) {
        let items = [];
        for (var i = 0; i < this.productReviews.length; i++) {
           items.push(this.productReviews[i]);
           if (items.length === this.itemsShowNumber) {
              var itemsCopy = Object.assign([], items);
              this.pages.push(itemsCopy);
              items.length = 0;
           } 
        }
        if (items.length) {
          this.pages.push(items);
        }
    }
  }

  createNumbersArray(): void{
    if (this.pages.length <= 10 || !this.pagesIndex.length) {
      this.pagesIndex.length = 0;
      for (var i = 0; i < this.pages.length; i++) {
        this.pagesIndex.push(i);
      }
    } else if ((this.pageSelected === 0) || (this.pageSelected - 9 <= 0 && this.pageSelected !== this.pagesIndex[this.pagesIndex.length - 1])) {
      this.pagesIndex.length = 0;
      for (var i = 0; i < 10; i++) {
        this.pagesIndex.push(i);
      }
    } else if ((this.pageSelected === this.pages.length - 1) || (this.pageSelected + 10 >= this.pages.length - 1 && this.pageSelected !== this.pagesIndex[0])) {
        this.pagesIndex.length = 0
        for (var i = this.pages.length -11; i < this.pages.length; i++) {
          this.pagesIndex.push(i);
        }
    } else {
         this.pagesIndex.length = 0;
         var end = (this.pageSelected - 4) + 11;
         for (var i = this.pageSelected - 4; i < end; i++) {
             this.pagesIndex.push(i);
         }
    } 
  }

  changePage(pageNumber: number): void{
    this.currentPage = this.pages[pageNumber];
    this.pageSelected = pageNumber;
    this.createNumbersArray();
  }

  getReviews(): void{
    var reviewPromise = this.warehouse.httpGet("http://localhost:8080//review/" + this.product.id);
    reviewPromise.then(function onSuccess(result: any) {
       if (result && result.length) {
          this.productReviews = this.productReviews.concat(result);
       }
       this.reviewsLoaded = true;
       this.calculateAverageRanking();
       this.initOrderedStars();
       this.splitProducts();
       this.currentPage = this.pages[0];
       this.pageSelected = 0;
       this.createNumbersArray();
    }.bind(this));
  }

  calculateAverageRanking() :void{
    if (!this.productReviews || !this.productReviews.length) {
        this.averageRanking = 5;
    } else {
      var total = 0;
      for (var i = 0; i < this.productReviews.length; i++) {
          total += this.productReviews[i]['ranking'];
      }
      var result = total / this.productReviews.length;
      result = Math.round(result);
      this.averageRanking = result;
    }
  }

  initShop(): void {
    var shop = new cbpShop( document.getElementById( 'cbp-pgcontainer' ) ); 
  }

  changeImage(image: string): void{
    this.currentImage = image;
  }
  
  convertString(item: string): any{
    let parsedItem = JSON.parse(item);
    if (Array.isArray(parsedItem)) {
       return parsedItem[0];
    } else {
      return parsedItem;
    }
  }

  addReview(): void{
    this.savingReview = true;
    var msg = {
      name: this.reviewName,
      ranking: this.reviewRanking,
      text: this.reviewText,
      productId: this.product.id
    }
    var reviewPromise = this.warehouse.httpPost("http://localhost:8080/review", msg);
    reviewPromise.then(function reviewAdded(result: any) {
      this.productReviews.push(result[0]);
      this.savingReview = false;
      this.reviewName = "";
      this.reviewText = "";
      this.reviewRanking = 5;
      this.calculateAverageRanking();
    }.bind(this));
  }

  /**** Stars functionality* *****/

  
  initOrderedStars(): void{
    this.orderedStars = [this.starOne, this.starTwo, this.starThree, this.starFour, this.starFive];
  }

  toggleStarClass(selectedStar: any): void{
    for (var i = 0; i < this.orderedStars.length; i++) {
        var star = this.orderedStars[i];
        var starElement = document.getElementById(star.id);
        if (star.position <= selectedStar.position) {
           if (!star.selected) {
            starElement.classList.remove("far");
            starElement.classList.add("fas");
            star.selected = true;
           }
        } else {
          if (star.selected) {
            starElement.classList.remove("fas");
            starElement.classList.add("far");
            star.selected = false;
          }
        }
    }
  }
  
  selectRanking(star: any): void{
    this.reviewRanking = star.value;
  }

  resetStars(): void{
    for (var i = 0; i < this.orderedStars.length; i++) {
       var star = this.orderedStars[i];
       var starElement = document.getElementById(star.id);
        if (star.value <= this.reviewRanking) {
           if (!star.selected) {
            starElement.classList.remove("far");
            starElement.classList.add("fas");
            star.selected = true;
           }
        } else {
          if (star.selected) {
            starElement.classList.remove("fas");
            starElement.classList.add("far");
            star.selected = false;
          }
        }
    }
  }
}
