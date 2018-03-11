import {Component, OnInit, OnDestroy, Output, EventEmitter} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
declare var jquery:any;
declare var $ :any;
declare var FilmRoll:any;
// import { Subscription } from 'rxjs/Subscription';
// import 'rxjs/add/operator/toPromise';

import { HeaderComponent } from "./../components/header.component.js";
import { ProductsComponent } from "./../components/products.component.js";
import { SplashComponent } from "./../components/splash.component.js";
import { FooterComponent } from "./../components/footer.component.js";
import { BasketComponent } from "./../components/basket.component.js";

import {WarehouseService} from './../services/warehouse.service.js';
import {MessageService} from './../services/message.service.js';
import {BasketService} from './../services/basket.service.js';
// import { WindowSize } from './../models/windowSize.js';
// import { Inspiration } from './../models/inspiration.js';
// declare var google: any;

@Component({
  selector: 'my-app',
  templateUrl: 'src/app/views/app.component.html',
  providers: [WarehouseService, MessageService, BasketService],
  entryComponents: [HeaderComponent, ProductsComponent, SplashComponent, FooterComponent, BasketComponent]
})
// export class AppComponent implements OnInit, OnDestroy {
export class AppComponent implements OnInit {
    public selectedCategory: string = null; //This should be null when in home page
    public data: any;
    public selectedProducts: any;
    private dataReceived: boolean = false;
    public selectedProduct: any;
    public selectedBasket: boolean = false;
    private subscription: Subscription;

    ngOnInit() {
      var dataPromise = this.warehouse.initData();
    }

    onCategoryChange(category: string): void {
      //this should be in selected product
      if (this.dataReceived) {
         this.selectedCategory = category;
         this.selectedProduct = null;
         this.selectedProducts = this.data.productsByCategory[this.selectedCategory];
         console.log("selected", this.selectedProducts[0]);
      } else {
        this.selectedProducts = [];
      }
    }

    renderBasket(): void{
      this.selectedProducts = null;
      this.selectedProduct = null;
      this.selectedBasket = true;
    }

  constructor(private warehouse: WarehouseService, private message: MessageService) { //private messageService: MessageService
    this.subscription = this.message.getMessage().subscribe(message => this.processMessage(message));
  };

  processMessage(message: any): void{
    if (message.text === "data-arrived" ) {
      this.dataReceived = true;
      console.log("Data in place");
    }
  }


//   ngOnInit(): void {
//     this.windowSize = this.commonService.getWindowSize();
//     let input = document.getElementById('locationTextField');
//     let autocomplete = new google.maps.places.Autocomplete(input);
//     if (this.windowSize.getWidth() >= 1200) {
//       this.height = '56.79px';
//       this.width = '100%';
//     }

//     this.departOptions = this.setOptions(false);
//     this.returnOptions = this.setOptions(true);
//   }

//   ngOnDestroy(): void {
//      this.substriction.unsubscribe();
//   }

}


