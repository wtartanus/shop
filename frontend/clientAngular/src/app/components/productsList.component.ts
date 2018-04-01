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
  public selectedCategory: any;
  public products: any;
  public selectedProduct: any;
  public itemsShowNumber: number = 15;
  public currentPage: any;
  private pages: Array<any> = new Array();
  public pagesIndex: Array<number> = new Array();
  public pageSelected: number;
  public loading: boolean = true;
  public sort: any = "2";

  constructor(private message: MessageService, private warehouse: WarehouseService, public basket: BasketService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.getProducts();
    this.getSearchProducts()
    this.splitProducts();
    this.currentPage = this.pages[0];
    this.pageSelected = 0;
    this.createNumbersArray();
  }

  getProducts(): void{
    this.route.params
      .subscribe((value) => {
        this.selectedCategory = this.route.snapshot.paramMap.get('category');
        if (this.selectedCategory) {
          if (!this.warehouse.data) {
            this.warehouse.dataPromise.then(function onSuccess() {
                this.products = this.warehouse.getProductsByCategory(this.selectedCategory);
                this.sortBy(null);
                this.categoryChange();
                this.loading = false;
            }.bind(this));
          } else {
              this.products = this.warehouse.getProductsByCategory(this.selectedCategory);
              this.sortBy(null);
              this.categoryChange();
              this.loading = false;
          }
        }
    });
  }

  getSearchProducts(): void {
    this.route.params
      .subscribe((value) => {
        let searchQuery = this.route.snapshot.paramMap.get('searchQuery');
        if (searchQuery) {
          if (!this.warehouse.data) {
            this.warehouse.dataPromise.then(function onSuccess() {
                this.products = this.warehouse.getSearchProducts(searchQuery);
                this.sortBy(null);
                this.categoryChange();
                this.loading = false;
            }.bind(this));
          } else {
              this.products = this.warehouse.getSearchProducts(searchQuery);
              this.sortBy(null);
              this.categoryChange();
              this.loading = false;
          }
        }
    });
  }

  categoryChange() {
    this.pages.length = 0;
    this.pagesIndex.length = 0;
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
    window.scrollTo(0, 0);
  }

  createNumbersArray(): void{
    if (this.pages.length <= 10) {
      this.pagesIndex.length = 0;
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
     window.scrollTo(0, 0);
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
    window.scrollTo(0, 0);
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
    window.scrollTo(0, 0);
  }

  selectProduct(product: any): void{
    this.router.navigate(["/product", product.id]);
  }

  sortBy(event: any): void{
    var type = parseInt(this.sort, 10);
    if (type === 0) {
      this.products.sort(function sortLowToHigh(a: any, b: any) {
         if (a.rpr < b.rpr) {
            return -1;
         } else if (a.rpr > b.rpr) {
            return 1;
         } else if (a.rpr === b.rpr) {
            return 0;
         }
      });
    } else if (type === 1) {
      this.products.sort(function sortHighToLow(a: any, b: any) {
        if (a.rpr > b.rpr) {
           return -1;
        } else if (a.rpr < b.rpr) {
           return 1;
        } else if (a.rpr === b.rpr) {
           return 0;
        }
     });
    } else if (type === 2) {
      this.products.sort(function sortByRanking(a: any, b: any) {
        var value1 = this.warehouse.data.reviews[a.id];
        var value2 = this.warehouse.data.reviews[b.id];
        if (!value1 && !value2) {
           return 0;
        } else if (value1 && !value2) {
           return -1;
        } else if (!value1 && value2) {
           return 1;
        } else if (value1 > value2) {
           return -1;
        } else if (value1 < value2) {
           return 1;
        } else if (value1 === value2) {
           return 0;
        }
     }.bind(this));
    }
    this.categoryChange();
  }
}
