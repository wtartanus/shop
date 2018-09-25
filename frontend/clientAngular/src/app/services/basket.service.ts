import {Injectable, Output, EventEmitter} from '@angular/core';
import {MessageService} from './message.service.js';

@Injectable()
export class BasketService {
  public totalCost: number = 0;
  public basketItems: Array<any> = new Array(); //TODO probably possible to remove it
  public basketItemsById: any = {};
  public itemsCount: number = 0;

  constructor(private message: MessageService) { }
  //TODO double check if array updates after updating objects
  addToBasket(quantity: number, product: any, size: any): void{
    if (quantity && product) {
        let cost = product.rpr * quantity;
        if (this.basketItemsById[product.id]) {
           this.basketItemsById[product.id]['cost'] += cost;
           this.basketItemsById[product.id]['quantity'] += quantity;
           
           if (this.basketItemsById[product.id]['size'][size]) {
                this.basketItemsById[product.id].size[size].quantity += quantity;
           } else {
               this.basketItemsById[product.id]['size'][size] = {};
               this.basketItemsById[product.id]['size'][size]["value"] = size;
               this.basketItemsById[product.id]['size'][size]["quantity"] = quantity;
           }

           for (var i = 0; i < this.basketItems.length; i++) {
              if (product.id === this.basketItems[i].product.id) {
                 if (this.basketItems[i].quantity !== this.basketItemsById[product.id].quantity) this.basketItems[i].quantity += quantity;
                 if (this.basketItems[i].cost !== this.basketItemsById[product.id].cost) this.basketItems[i].cost += cost;
              }
           }
        } else {
            let basketItem = {
                quantity: quantity,
                product: product,
                cost: cost,
                size: {}
            }
            if (size) {
               basketItem.size[size] = {};
               basketItem.size[size]["value"] = size;
               basketItem.size[size]["quantity"] = quantity;
            }
            this.basketItems.push(basketItem);
            this.basketItemsById[product.id] = basketItem;
        }
        this.totalCost += cost;
        this.totalCost = parseFloat(this.totalCost.toFixed(2));
        this.itemsCount += quantity;
        let body = {
            totalCost: this.totalCost,
            itemsCount: this.itemsCount
        }
        this.message.sendMessage("basket-update", body);
    }
  }

  removeFromBasket(newQuantity: number, product: any): void{
     if (product && this.basketItemsById[product.id]) {
        if (newQuantity) {
            this.totalCost -= this.basketItemsById[product.id].cost;
            this.basketItemsById[product.id].cost = newQuantity * product.rpr;
            this.itemsCount -= this.basketItemsById[product.id].quantity;
            this.itemsCount += newQuantity;
            this.basketItemsById[product.id].quantity = newQuantity;
        } else {
           this.totalCost -= this.basketItemsById[product.id];
           this.itemsCount -= this.basketItemsById[product.id].quantity;
           delete this.basketItemsById[product.id];
           var index;
           for (var i = 0; i < this.basketItems.length; i++) {
               if (this.basketItems[i].product.id === product.id) {
                   index = i;
                   break;
               }
           }
           this.basketItems.splice(index, 1);
        }
        let body = {
            totalCost: this.totalCost,
            itemsCount: this.itemsCount
        }
        this.message.sendMessage("basket-update", body);
     }
  }
}
