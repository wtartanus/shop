import {Component, OnInit, OnDestroy, Input, Output, EventEmitter} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { BasketService } from '../services/basket.service.js';
import { MessageService } from '../services/message.service.js';
import { Route, Router } from '@angular/router';
import { CategoriesService } from '../services/categories.service.js';


@Component({
  selector: 'ng-header',
  templateUrl: 'src/app/views/header.component.html'
})
export class HeaderComponent implements OnInit {
    @Input() selectedCategory: string;
    @Input() selectedBasket: boolean;
    @Output() onCategoryChange = new EventEmitter<string>();
    public basketValues: any = {itemsCount: 0, totalCost: 0};
    public itemsCount: number = this.basket.itemsCount;
    public searchQuery: string = "";
    subscription: Subscription;
    public categories: any = this.categoriesService.categoriesTree;
    public showNavigation: boolean = false;
   
    constructor (public basket: BasketService, private messageService: MessageService, private router: Router, public categoriesService: CategoriesService) {
        this.subscription = this.messageService.getMessage().subscribe(message => this.processMessage(message));
    }

    processMessage(message: any): void{
      if (message.text === "basket-update") {
          this.basketValues.itemsCount = message.body.itemsCount;
          this.basketValues.totalCost = message.body.totalCost;
      }
    }

    ngOnInit() {
      console.log("category header", this.selectedCategory);
    }

    toggleCategory(category: any): void{
      if (category.$open === undefined || category.$open === null) {
          category.$open = true;
      } else {
          category.$open = !category.$open;
      }
    }

    changeCategory(category: string): void {
        this.router.navigate(["/categories", category]);
    }

    search(): void {
        this.router.navigate(["/search", this.searchQuery]);
    }

    goToHomePage(): void{
        this.selectedCategory = null;
        this.onCategoryChange.emit(this.selectedCategory);
    }
}
