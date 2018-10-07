import { Component, AfterViewChecked, OnDestroy } from '@angular/core';

import { BasketService } from '../../services/basket.service.js';
import { WarehouseService } from '../../services/warehouse.service.js';
import { Route, Router } from '@angular/router';

declare var paypal: any;
@Component({
  selector: 'checkout',
  templateUrl: '../../views/checkout.component.html',
  styleUrls: ['./Checkout.css']
})
export class CheckoutComponent implements AfterViewChecked {
  public orderConfirmed: boolean = false; 
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

  private addScript: boolean = false;
  private paypalConfig = {
        env: 'sandbox',
        client: {
            sandbox: 'AfKg2dIdiKuH-qxJcFbhcfsVbujI9VNp-puzhDKmszofutAaW9yyoYpGmuVnCnEnWMsIZbH9OE_82D3v',
            production: 'Aes45OMkcqgphCC0Wwn1vKzWHjFPiA_NbmLDOXLJVvU_UsW5B2HqDX61h5h3pClT379xZPCET3f7tiyv'
        },
        commit: true,
        payment: (data, actions) => {
            return actions.payment.create({
                payment: {
                    transactions: [{
                        amount: {total: this.basket.totalCost, currency: 'GBP'}
                    }]
                }
            });
        },
        onAuthorize: (data, actions) => {
            return actions.payment.execute().then(payment => {
                console.log('payment', payment);
                this.orderConfirmed = true;
                const { email, first_name, last_name } = payment.payer.payer_info;
                const { city, line1, line2, postal_code } = payment.payer.payer_info.shipping_address;
                const info = {
                    email: email,
                    firstName: first_name,
                    lastName: last_name,
                    city: city,
                    addressOne: line1,
                    addressTwo: line2,
                    postcode: postal_code
                };

                this.proccessOrder(info);
            });
        }
  }

  constructor (public basket: BasketService, public warehouse: WarehouseService) {}

  ngAfterViewChecked(): void {
    if (!this.addScript) {
        this.addPaypalScript().then(() => {
            paypal.Button.render(this.paypalConfig, 'paypal-button');
            this.warehouse.setScriptLoaded(true);
        });
    }
  }

  addPaypalScript(): Promise<any> {
    this.addScript = true;

    return new Promise((resolve, reject) => {
        if (!this.warehouse.getScriptLoaded()) {
            const scripttagElement = document.createElement('script');    
            scripttagElement.src = 'https://www.paypalobjects.com/api/checkout.js';
            scripttagElement.onload = resolve;
            document.body.appendChild(scripttagElement);
        } else {
            resolve(true);
        }
    });
  }

  proccessOrder(info: any): void {
     const nowDate = new Date();
     const msg = {
        order: {},
        orderItems:  new Array()
     };
     msg.order = {
        orderConfirmed: this.orderConfirmed,
        email: info.email,
        fullName: info.firstName + " " + info.lastName,
        adres: info.addressTwo ? info.addressOne + " " + info.addressTwo : info.addressOne,
        city: info.city,
        postcode: info.postcode,
        deliveryType: this.deliveryTypes[this.delivery].name,
        deliveryPrice: this.deliveryTypes[this.delivery].cost.toString(),
        totalCost: this.basket.totalCost,
        totalPersonalCost: 0,
        referenceNumber: new Date().getTime().toString(),
        dateOrdered: nowDate.toISOString()
     }

     msg.orderItems = this.basket.basketItems.map(item => {
        msg.order['totalPersonalCost'] += item.product.price; //TODO use reduce

        return {
            orderId: 0,
            productId: item.product.id,
            model: item.product.model,
            size: item.size,
            name: item.product.name,
            quantity: item.quantity,
            price: item.cost
        }
     });

     this.warehouse.httpPost("http://localhost:8080/order", msg);
     this.basket.resetBasket();
  }
}
