import {Component, OnInit, OnDestroy} from '@angular/core';

import { WarehouseService } from "../services/warehouse.service.js";
import { BasketService } from '../services/basket.service.js';
import { MessageService } from '../services/message.service.js';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'productsList',
  templateUrl: 'src/app/views/productsList.component.html'
})
export class ProductsListComponent implements OnInit {
  public selectedCategory: string;
  public products: any;
  public selectedProduct: any;
  public itemsShowNumber: number = 15;
  public currentPage: any;
  private pages: Array<any> = new Array();
  public pagesIndex: Array<number> = new Array();
  public pageSelected: number;

  constructor(private message: MessageService, private warehouse: WarehouseService, public basket: BasketService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.getProducts();
    this.splitProducts();
    this.currentPage = this.pages[0];
    this.pageSelected = 0;
    this.createNumbersArray();
  }

  getProducts(): void{
    this.route.params
      .subscribe((value) => {
        let category = this.route.snapshot.paramMap.get('category');
        this.products = this.warehouse.getProductsByCategory(category);
        this.categoryChange();
    });
  }

  categoryChange() {
    this.pages.length = 0;
    this.splitProducts();
    if (this.currentPage) {
      this.currentPage.length = 0;
    }
    this.currentPage = this.pages[0];
    this.pageSelected = 0;
    this.createNumbersArray();
  }

  splitProducts(): void{
    if (this.products) {
        let items = [];
        for (var i = 0; i < this.products.length; i++) {
           items.push(this.products[i]);
           if (items.length === this.itemsShowNumber) {
              var itemsCopy = Object.assign([], items);
              this.pages.push(itemsCopy);
              items.length = 0;
           } 
        }
        if (items.length) {
          this.pages.push(items);
        }
    }
  }

  createNumbersArray(): void{
    if (this.pages.length <= 10 && !this.pagesIndex.length) {
      for (var i = 0; i < this.pages.length; i++) {
        this.pagesIndex.push(i);
      }
    } else if ((this.pageSelected === 0) || (this.pageSelected - 9 <= 0 && this.pageSelected !== this.pagesIndex[this.pagesIndex.length - 1])) {
      this.pagesIndex.length = 0;
      for (var i = 0; i < 10; i++) {
        this.pagesIndex.push(i);
      }
    } else if ((this.pageSelected === this.pages.length - 1) || (this.pageSelected + 10 >= this.pages.length - 1 && this.pageSelected !== this.pagesIndex[0])) {
        this.pagesIndex.length = 0
        for (var i = this.pages.length -11; i < this.pages.length; i++) {
          this.pagesIndex.push(i);
        }
    } else {
         this.pagesIndex.length = 0;
         var end = (this.pageSelected - 4) + 11;
         for (var i = this.pageSelected - 4; i < end; i++) {
             this.pagesIndex.push(i);
         }
    } 
  }

  changePage(pageNumber: number): void{
     this.currentPage = this.pages[pageNumber];
     this.pageSelected = pageNumber;
     this.createNumbersArray();
  }

  goToStartEnd(goToStart: boolean): void{
    if (goToStart) {
      this.currentPage = this.pages[0];
      this.pageSelected = 0;
    } else {
      this.currentPage = this.pages[this.pages.length - 1];
      this.pageSelected = this.pages.length - 1;
    }
    this.createNumbersArray();
  }

  moveByOnePage(goLeft: boolean): void{
    if (goLeft) {
      if (this.pageSelected) {
        this.pageSelected--;
        this.currentPage = this.pages[this.pageSelected];
      }
    } else {
      if (this.pageSelected !== this.pages.length - 1) {
        this.pageSelected++;
        this.currentPage = this.pages[this.pageSelected];
      }
    }
    this.createNumbersArray();
  }

  selectProduct(product: any): void{
    // this.selectedProduct = product;
    this.router.navigate(["/product", product.id]);
    // this.onProductSelection.emit(this.selectedProduct);
  }
}
