import {Component, OnInit, OnDestroy, Input, Output, EventEmitter, HostBinding} from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Subscription } from 'rxjs/Subscription';

import { BasketService } from '../services/basket.service.js';
import { MessageService } from '../services/message.service.js';
import { WarehouseService } from '../services/warehouse.service.js';


@Component({
  selector: 'basket',
  templateUrl: 'src/app/views/basket.component.html'
})
export class BasketComponent implements OnInit {
    public basketItems: any;

    constructor(private warehouse: WarehouseService, public basket: BasketService) {
    };

    ngOnInit() {
      if (this.basket.basketItemsById) {
        this.basketItems = this.basket.basketItems;
        console.log("this.basketItems", this.basketItems);
      }
    }
}
