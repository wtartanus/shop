import {Injectable} from '@angular/core';


@Injectable()
export class BasketService {
  public totalCost: number = 0;
  public basketItems: Array<any> = new Array(); //TODO probably possible to remove it
  public basketItemsById: any = {};
  public itemsCount: number = 0;


  addToBasket(quantity: number, product: any): void{
    if (quantity && product) {
        let cost = product.rpr * quantity;
        if (this.basketItemsById[product.id]) {
           this.basketItemsById[product.id]['cost'] += cost;
           this.basketItemsById[product.id]['quantity'] += quantity;

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
                cost: cost
            }
            this.basketItems.push(basketItem);
            this.basketItemsById[product.id] = basketItem;
        }
        this.totalCost += cost;
        this.itemsCount += quantity;
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
     }
  }
}
