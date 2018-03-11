import {Component, OnInit, OnDestroy, Output, EventEmitter} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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

    ngOnInit() {
      var dataPromise = this.warehouse.initData();
      dataPromise.then(result => this.onDataReceived(result));
    }

    onCategoryChange(category: string): void {
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

  constructor(private warehouse: WarehouseService) { //private messageService: MessageService
    //this.substriction = this.messageService.getMessage().subscribe(message => this.updateDates(message));
  };

  onDataReceived(data: any): void{
    this.data = data;
    this.dataReceived = true;
    console.log("Data in place");
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

/******* TODO
 * - add side menu
 * - add place to add reviews
 * - add ranking
 * - assure that data been loaded
 * - add page to ask if user is 18 years old
 * - hook up search
 * - add filters to products list
 * - Single product should show sizes
 * - Update home page 
 * - Disable add to cart if product is out of stock
 * - Map discounted
 * - Check if basket work properly
 * - Add videos.
 * - Add basket page??
 * - Add checkout page
 * - Add new table for orders
 * - Add page to display all orders
 * ********/

