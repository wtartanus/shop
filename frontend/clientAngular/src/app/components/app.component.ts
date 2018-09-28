import {Component, OnInit, OnDestroy, Output, EventEmitter} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
declare var jquery:any;
declare var $ :any;
declare var FilmRoll:any;

import { HeaderComponent } from "./../components/header.component.js";
import { SplashComponent } from "./../components/splash.component.js";
import { FooterComponent } from "./../components/footer.component.js";
import { BasketComponent } from "./../components/basket.component.js";
import { ProductsListComponent } from "./../components/productsList.component.js";
import { SingleProductComponent } from "./../components/singleProduct.component.js";

import {WarehouseService} from './../services/warehouse.service.js';
import {MessageService} from './../services/message.service.js';
import {BasketService} from './../services/basket.service.js';

@Component({
  selector: 'my-app',
  templateUrl: 'src/app/views/app.component.html',
  providers: [WarehouseService, MessageService, BasketService],
  entryComponents: [HeaderComponent, SplashComponent, FooterComponent, BasketComponent, ProductsListComponent, SingleProductComponent]
})
// export class AppComponent implements OnInit, OnDestroy {
export class AppComponent implements OnInit {
    private dataReceived: boolean = false;
    private subscription: Subscription;

    ngOnInit() {
      // this.warehouse.initData();
    }

    constructor(private warehouse: WarehouseService, private message: MessageService) { //private messageService: MessageService
      this.subscription = this.message.getMessage().subscribe(message => this.processMessage(message));
    };

    processMessage(message: any): void{
      if (message.text === "data-arrived" ) {
        this.dataReceived = true;
        console.log("Data in place");
        console.log("data", this.warehouse.data);
      }
    }

    closeNav(): void{
      this.message.sendMessage("close-nav", {});
    }

//   ngOnDestroy(): void {
//      this.substriction.unsubscribe();
//   }

}


