import {Component, OnInit, OnDestroy, Input, Output, EventEmitter} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { BasketService } from '../services/basket.service.js';
import { MessageService } from '../services/message.service.js';
import { WarehouseService } from '../services/warehouse.service.js';
import { Route, Router } from '@angular/router';
import { CategoriesService } from '../services/categories.service.js';


@Component({
  selector: 'checkout',
  templateUrl: '../views/checkout.component.html'
})
export class CheckoutComponent implements OnInit {
  public orderConfirmed: boolean = false;
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

  constructor (public basket: BasketService, public warehouse: WarehouseService) {}

  ngOnInit() {
    window.scrollTo(0, 0);
  }

  proccessOrder(): void{
    var nowDate = new Date();
     this.orderConfirmed = true;
     var msg = {
       order: {},
       orderItems:  new Array()
     };
     msg.order = {
        orderConfirmed: this.orderConfirmed,
        email: this.email,
        fullName: this.firstName + " " + this.lastName,
        adres: this.addressTwo ? this.addressOne + " " + this.addressTwo : this.addressOne,
        city: this.city,
        postcode: this.postcode,
        deliveryType: this.deliveryTypes[this.delivery].name,
        deliveryPrice: this.deliveryTypes[this.delivery].cost.toString(),
        totalCost: this.basket.totalCost,
        totalPersonalCost: 0,
        referenceNumber: new Date().getTime().toString(),
        dateOrdered: nowDate.toISOString()
     }

     for (var i = 0; i < this.basket.basketItems.length; i++) {
          var item = this.basket.basketItems[i];
          console.log("item", item);
          msg.order['totalPersonalCost'] += item.product.price;

          var orderItem = {
              orderId: 0,
              productId: item.product.id,
              model: item.product.model,
              size: item.size,
              name: item.product.name,
              quantity: item.quantity,
              price: item.cost
          }
          console.log(orderItem);
          msg.orderItems.push(orderItem);
     }

     this.warehouse.httpPost("http://localhost:8080/order", msg);
  }

  isValid() {
    if (this.email && this.firstName && this.lastName && this.addressOne && this.city && this.postcode) {
      return true;
    }
    return false;
  }
}
