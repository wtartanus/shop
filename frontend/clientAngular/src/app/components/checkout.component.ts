import {Component, OnInit, OnDestroy, Input, Output, EventEmitter} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { BasketService } from '../services/basket.service.js';
import { MessageService } from '../services/message.service.js';
import { Route, Router } from '@angular/router';
import { CategoriesService } from '../services/categories.service.js';


@Component({
  selector: 'checkout',
  templateUrl: 'src/app/views/checkout.component.html'
})
export class CheckoutComponent implements OnInit {
  public email: string;
  public firstName: string;
  public lastName: string;
  public addressOne: string;
  public addressTwo: string;
  public city: string;
  public postcode: string; 
  public delivery: string = "1";
  private deliveryTypes: any = {
    "1": {name: "Royal Mail Second Class", cost: 2.71},
    "2": {name: "Royal Mail First Class", cost: 2.71},
    "3": {name: "Royal Mail Tracked48", cost: 3.28},
    "4": {name: "Royal Mail Tracked24", cost: 4.68},
    "5": {name: "DPD Express Next Day", cost: 5.05},
    "6": {name: "DPD Weekend Shipping", cost: 7.10},
    "7": {name: "Royal Mail Overnight", cost: 6.40}
  }

  constructor (public basket: BasketService) {}

  ngOnInit() {
    console.log("@@@", this.basket);
  }
}
