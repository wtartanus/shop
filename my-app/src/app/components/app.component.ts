import {Component, OnDestroy, Output, EventEmitter} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { HeaderComponent } from "./Header/header.component.js";
import { SplashComponent } from "./Splash/splash.component.js";
import { FooterComponent } from "./../components/footer.component.js";
import { BasketComponent } from "./../components/basket.component.js";
import { ProductsListComponent } from "./../components/productsList.component.js";
import { SingleProductComponent } from "./../components/singleProduct.component.js";

import {WarehouseService} from './../services/warehouse.service.js';
import {MessageService} from './../services/message.service.js';
import {BasketService} from './../services/basket.service.js';

@Component({
  selector: 'my-app',
  templateUrl: '../views/app.component.html',
  providers: [WarehouseService, MessageService, BasketService],
  entryComponents: [HeaderComponent, SplashComponent, FooterComponent, BasketComponent, ProductsListComponent, SingleProductComponent]
})
export class AppComponent {
    private dataReceived: boolean = false;
    private subscription: Subscription;

    constructor(private warehouse: WarehouseService, private message: MessageService) { //private messageService: MessageService
      this.subscription = this.message.getMessage().subscribe(message => this.processMessage(message));
    };

    processMessage(message: any): void{
      if (message.text === "data-arrived" ) {
        this.dataReceived = true;
      }
    }

    closeNav(): void{
      this.message.sendMessage("close-nav", {});
    }
}


