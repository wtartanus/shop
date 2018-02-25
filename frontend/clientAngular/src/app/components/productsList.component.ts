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

  ngOnInit() {
    this.initShop();
    this.initPopUpBox();
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
