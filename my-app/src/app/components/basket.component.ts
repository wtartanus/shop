import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { BasketService } from '../services/basket.service.js';
import { WarehouseService } from '../services/warehouse.service.js';


@Component({
  selector: 'basket',
  templateUrl: '../views/basket.component.html',
  styleUrls: ['./Basket.css']
})
export class BasketComponent implements OnInit {
    public basketItems: any;

    constructor(private warehouse: WarehouseService, public basket: BasketService, private router: Router,) {
    };

    ngOnInit() {
      if (this.basket.basketItemsById) {
        window.scrollTo(0, 0);
        this.basketItems = this.basket.basketItems;
      }
    }

    goToCheckout(): void {
      this.router.navigate(["/checkout"]);
  }
}
