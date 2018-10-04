import {Component, OnInit, OnDestroy} from '@angular/core';

import { WarehouseService } from "../services/warehouse.service.js";
import { BasketService } from '../services/basket.service.js';
import { MessageService } from '../services/message.service.js';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'productsList',
  templateUrl: '../views/productsList.component.html',
  styleUrls: ['./ProductsList.css']
})
export class ProductsListComponent implements OnInit {
  public selectedCategory: any;
  public products: any;
  public selectedProduct: any;
  public itemsShowNumber: number = 15;
  public currentPage: any;
  public pages: Array<any> = new Array();
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

  getImageSrc(product: any): string {
    const { image, xlImage, xlImage2, xlImage3 } = product;
    if (this.isSrcProvided(image)) return `images/main/${image}`;
    if (this.isSrcProvided(xlImage)) return `images/hires/${xlImage}`;
    if (this.isSrcProvided(xlImage2)) return `images/hires/${xlImage2}`;
    if (this.isSrcProvided(xlImage3)) return `images/hires/${xlImage3}`;
    return "images/main/not-found.png";
  }

  isSrcProvided(src: any): boolean {
    return src && src !== '' && src !== {};
  }

  getProducts(): void{
    this.route.params
      .subscribe((value) => {
        this.selectedCategory = this.route.snapshot.paramMap.get('category');
        if (this.warehouse.hasCategory(this.selectedCategory)) {
              this.products = this.warehouse.productsByCategory[this.selectedCategory];
              //this.sortBy(null);
              this.categoryChange();
              this.loading = false;
        } else {
            this.warehouse.fetchCategory(this.selectedCategory).then(() => {
                this.products = this.warehouse.productsByCategory[this.selectedCategory];
                //this.sortBy(null);
                this.categoryChange();
                this.loading = false;
            });
        }
    });
  }

  getSearchProducts(): void {
    this.route.params.subscribe((value) => {
        let searchQuery = this.route.snapshot.paramMap.get('searchQuery');
        if (searchQuery) {
          if (!this.warehouse.productsBySearch[searchQuery]) {
            this.warehouse.getSearchProducts(searchQuery).then(() => {
                this.products = this.warehouse.productsBySearch[searchQuery];
                this.sortBy();
                this.categoryChange();
                this.loading = false;
            });
          } else {
              this.products = this.warehouse.productsBySearch[searchQuery];
              this.sortBy();
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
  }

  createNumbersArray(): void {
    this.pagesIndex.length = 0;
    this.pageSelected = this.pageSelected || 0;

    if (this.pages.length <= 4) {
        this.pagesIndex = this.pages.map((item, index) => index);
    } else {
         let start = this.pageSelected <= 4 ? 0 : this.pageSelected;
         let end = this.pageSelected + 4;
         end = end <= this.pages.length ? end : this.pages.length;

         for (; start <= end; start++) {
            this.pagesIndex.push(start);
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
    this.router.navigate(["/product", product.id]);
  }

    sortBy(): void{
        var type = parseInt(this.sort, 10);
        switch (type) {
        case 0:
            this.products = this.sortLowToHigh([...this.products]);
            break;
        case 1:
            this.sortHighToLow([...this.products]);
            break;
        case 2:
            this.products = this.sortByRanking([...this.products]);
            break;
        }

        this.categoryChange();
    }

    sortLowToHigh(list: Array<any>): Array<any> {
        return list.sort((a, b) => {
                if (a.rpr < b.rpr) return -1;
                if (a.rpr > b.rpr) return 1;
                return 0;
        });
    }

    sortHighToLow(list: Array<any>): Array<any> {
        return list.sort((a, b) => {
            if (a.rpr > b.rpr) return -1;
            if (a.rpr < b.rpr) return 1;
            return 0;
        });
    }

    sortByRanking(list: Array<any>): Array<any> {
        return list.sort((a, b) => {
            const value1 = this.warehouse.reviewsByProductId[a.id];
            const value2 = this.warehouse.reviewsByProductId[b.id];
            if ((!value1 && !value2) || (value1 === value2)) return 0;
            if ((value1 && !value2) || (value1 > value2)) return -1;
            if ((!value1 && value2) || (value1 < value2)) return 1;
            return 0;
        });
    }
}
