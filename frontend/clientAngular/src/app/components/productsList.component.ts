import {Component, OnInit, OnDestroy, Input, Output, EventEmitter} from '@angular/core';
import {IMyOptions, IMyDateModel} from 'mydatepicker';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
declare var jquery:any;
declare var $ :any;
declare var cbpShop: any;
declare var w3l: any;
// import { Subscription } from 'rxjs/Subscription';
// import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'productsList',
  templateUrl: 'src/app/views/productsList.component.html'
  // entryComponents: [InspirationsComponent, DatePickerComponent]
})
export class ProductsListComponent implements OnInit {
  @Input() selectedCategory: string;
  @Input() products: any;
  @Output() onProductSelection = new EventEmitter<any>();
  public selectedProduct: any;
  public itemsShowNumber: number = 15;
  public currentPage: any;
  private pages: Array<any> = new Array();
  public pagesIndex: Array<number> = new Array();
  public pageSelected: number;

  ngOnInit() {
    this.initShop();
    this.initPopUpBox();
    this.splitProducts();
    this.currentPage = this.pages[0];
    this.pageSelected = 0;
    this.createNumbersArray();
    console.log("splited products: ", this.pages);
    console.log("pagesIndex", this.pagesIndex);
  }

  splitProducts(): void{
    if (this.products) {
        let items = [];
        for (var i = 0; i < this.products.length; i++) {
           items.push(this.products[i]);
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
    if (this.pages.length <= 10 && !this.pagesIndex.length) {
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

  goToStartEnd(goToStart: boolean): void{
    if (goToStart) {
      this.currentPage = this.pages[0];
      this.pageSelected = 0;
    } else {
      this.currentPage = this.pages[this.pages.length - 1];
      this.pageSelected = this.pages.length - 1;
    }
    this.createNumbersArray();
  }

  moveByOnePage(goLeft: boolean): void{
    if (goLeft) {
      if (this.pageSelected) {
        this.pageSelected--;
        this.currentPage = this.pages[this.pageSelected];
      }
    } else {
      if (this.pageSelected !== this.pages.length - 1) {
        this.pageSelected++;
        this.currentPage = this.pages[this.pageSelected];
      }
    }
    this.createNumbersArray();
  }

  selectProduct(product: any): void{
    this.selectedProduct = product;
    this.onProductSelection.emit(this.selectedProduct);
  }


  initShop(): void {
    var shop = new cbpShop( document.getElementById( 'cbp-pgcontainer' ) ); 
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
