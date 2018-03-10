import {Component, OnInit, OnDestroy, Input} from '@angular/core';
import {IMyOptions, IMyDateModel} from 'mydatepicker';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import {WarehouseService} from './../services/warehouse.service.js';

declare var jquery:any;
declare var $ :any;
declare var cbpShop: any;
declare var w3l: any;
// import { Subscription } from 'rxjs/Subscription';
// import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'singleProduct',
  templateUrl: 'src/app/views/singleProduct.component.html',
  providers: [WarehouseService]
  // entryComponents: [InspirationsComponent, DatePickerComponent]
})
export class SingleProductComponent implements OnInit {
  @Input() data: any;
  @Input() product: any;
  @Input() productStock: any;
  public currentImage: any;
  public reviewName: string;
  public reviewText: string;
  public reviewRanking: number = 5;
  public productReviews: Array<any> = new Array();
  public savingReview: boolean = false;

  ngOnInit() {
    this.currentImage = this.product.xlImage2 && this.product.xlImage2 !== '{}' ? this.product.xlImage2 : this.product.image;
    // this.initShop();
    // this.initPopUpBox();
    this.initSome();
    this.getReviews();
    console.log("product", this.product);
    console.log("stock", this.productStock);
  }

  constructor(private warehouse: WarehouseService ) {
  };

  getReviews(): void{
    var reviewPromise = this.warehouse.httpGet("http://localhost:8080//review/" + this.product.id);
    reviewPromise.then(function onSuccess(result: any) {
       if (result && result.length) {
          this.productReviews = this.productReviews.concat(result);
       }
    }.bind(this));
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
    }.bind(this));
  }

  initSome(): void{
    $(window).load(function() {
      $('.flexslider').flexslider({
        animation: "slide",
        controlNav: "thumbnails"
      });
    });
  }

 initPopUpBox(): void {
    $(document).ready(function() {
      $('.popup-with-zoom-anim').magnificPopup({
        type: 'inline',
        fixedContentPos: false,
        fixedBgPos: true,
        overflowY: 'auto',
        closeBtnInside: true,
        preloader: false,
        midClick: true,
        removalDelay: 300,
        mainClass: 'my-mfp-zoom-in'
      });
    });
 }

 initCart(): void {
   //TODO maybe not needed
  w3l.render();

  w3l.cart.on('w3agile_checkout', function (evt: any) {
    var items, len, i;

    if (this.subtotal() > 0) {
      items = this.items();

      for (i = 0, len = items.length; i < len; i++) { 
      }
    }
  });
 }
}
