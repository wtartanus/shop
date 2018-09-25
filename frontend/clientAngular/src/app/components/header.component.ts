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

    toggleNavigation(): void {
        this.showNavigation = !this.showNavigation;
    }

    processMessage(message: any): void{
      if (message.text === "basket-update") {
          this.basketValues.itemsCount = message.body.itemsCount;
          this.basketValues.totalCost = message.body.totalCost;
      }
      if (message.text === "close-nav") {
          this.closeAll();
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

    closeAll(): void {
        this.showNavigation = false;
        for (var i = 0; i < this.categories.length; i++) {
            this.categories[i].$open = false;
            if (this.categories[i].subCategories) {
                var subCategories = this.categories[i].subCategories;
                for (var j = 0; j < subCategories.length; j++) {
                    subCategories[j].$open = false;
                    if (subCategories[j].subCategories) {
                        var subs = subCategories[j].subCategories;
                        for (var k = 0; k < subs.length; k++) {
                            subs[k].$open = false;
                        }
                    }
                }
            }
        }
    }

    openCategory(category: any): void{
       if (!category.subCategories) {
           this.changeCategory(category.name);
       } else {
            category.$open = !category.$open;
        
        for (var i = 0; i < this.categories.length; i++) {
            if (this.categories[i].name !== category.name && (!category.parents || category.parents.indexOf(this.categories[i].name) < 0)) {
                this.categories[i].$open = false;
            }
    
            if (this.categories[i].subCategories) {
                let subCategories = this.categories[i].subCategories;
                for (let j = 0; j < subCategories.length; j++) {
                    if (category.name !== subCategories[j].name && (!category.parents || category.parents.indexOf(subCategories[j].name) < 0)) {
                        subCategories[j].$open = false;
                    }
                    if (subCategories[j].subCategories) {
                        var subs = subCategories[j].subCategories;
                        for (var k = 0; k < subs.length; k++) {
                            if (subs[k].name !== category.name) {
                                subs[k].$open = false;
                            }
                        }
                    }
                }
            }
        }
       }
    }

    changeCategory(category: string): void {
        this.closeAll();
        this.router.navigate(["/categories", category]);
    }

    search(): void {
        this.closeAll();
        this.router.navigate(["/search", this.searchQuery]);
    }

    goToHomePage(): void{
        this.selectedCategory = null;
        this.closeAll();
        this.onCategoryChange.emit(this.selectedCategory);
    }
}
