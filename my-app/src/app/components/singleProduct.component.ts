import {Component, OnInit, OnDestroy, Input} from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import {WarehouseService} from './../services/warehouse.service.js';
import { BasketService } from '../services/basket.service.js';
import { MessageService } from '../services/message.service.js';

@Component({
  selector: 'singleProduct',
  templateUrl: '../views/singleProduct.component.html',
  styleUrls: ['./SingleProduct.css']
})
export class SingleProductComponent implements OnInit {
  public product: any;
  public productStock: any;
  public currentImage: any;
  public reviewName: string;
  public reviewText: string;
  public quantity: number = 1;
  public size: any;
  public reviewRanking: number = 5;
  public productReviews: Array<any> = new Array();
  public savingReview: boolean = false;
  public reviewsLoaded: boolean = false;
  public averageRanking: number;
  public loading: boolean = true;
  public description: boolean = true;
  public specifications: boolean = false;
  public reviews: boolean = false;
  public sizeCharts: boolean = false;

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

  constructor(
    private warehouse: WarehouseService, 
    public basket: BasketService, 
    private route: ActivatedRoute, 
    private router: Router
  ) {};

  ngOnInit() {
    this.getProduct();
  }

  getProduct(): void{
    this.route.params.subscribe(() => {
      const productId = Number(this.route.snapshot.paramMap.get('id'));
      let product = this.warehouse.productsById[productId];
      if (product) {
          this.product = product;
          this.productStock = this.warehouse.stockByProductId[productId];
          this.mapProductSize();
          this.loading = false;
          this.setPhoto();
          this.getReviews();
      } else {
          this.warehouse.getProductById(productId).then(() => {
              this.product = this.warehouse.productsById[productId];
              this.productStock = this.warehouse.stockByProductId[productId];
              this.mapProductSize();
              this.loading = false;
              this.setPhoto();
              this.getReviews();
          });
      }
    });
  }

  mapProductSize() {
    if (this.productStock && this.productStock.size) {
      this.productStock.size = JSON.parse(this.productStock.size);

      let productStockSize = this.productStock.size.length -1;
      for (let i = productStockSize; i >=0; i--) {
        if (this.productStock.size[i].content === "No Stock." || this.productStock.size[i].content === "No Stock") {
          this.productStock.size.splice(i, 1);
        }
      }
      this.size = this.productStock.size[0].Size;
    } else {
      this.productStock.size = null;
    }
  }

  setPhoto(): void {
    if (this.product.xlImage2 && this.product.xlImage2 !== '{}') {
      this.currentImage = this.product.xlImage2;
    } else {
      this.currentImage = this.product.image;
    }
  }

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
    this.pagesIndex.length = 0;
    this.pageSelected = this.pageSelected || 0;

    if (this.pages.length <= 4) {
        this.pagesIndex = this.pages.map((item, index) => index);
    } else {
         let start = this.pageSelected <= 4 ? 0 : this.pageSelected;
         let end = this.pageSelected + 4;
         end = end <= this.pages.length ? end : this.pages.length;

         for (; start <= end; start++) {
            this.pagesIndex.push(start);
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
      productid: this.product.id
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

  resetStars(): void {
    for (let i = 0; i < this.orderedStars.length; i++) {
      const star = this.orderedStars[i];
      const starElement = document.getElementById(star.id);
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
