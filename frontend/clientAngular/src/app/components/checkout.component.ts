import {Component, OnInit, OnDestroy, Input, Output, EventEmitter} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { BasketService } from '../services/basket.service.js';
import { MessageService } from '../services/message.service.js';
import { Route, Router } from '@angular/router';
import { CategoriesService } from '../services/categories.service.js';


@Component({
  selector: 'checkout',
  templateUrl: 'src/app/views/checkout.component.html'
})
export class CheckoutComponent {

}
