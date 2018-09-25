import { NgModule }       from "@angular/core";
import { BrowserModule }  from "@angular/platform-browser";
import { FormsModule }    from "@angular/forms";
import { HttpModule }       from "@angular/http";
import { RouterModule, Routes } from "@angular/router";

import { AppComponent } from "./../components/app.component.js";
import { HeaderComponent } from "./../components/header.component.js";
import { SingleProductComponent } from "./../components/singleProduct.component.js";
import { ProductsListComponent } from "./../components/productsList.component.js";
import { FooterComponent } from "./../components/footer.component.js";
import { SplashComponent } from "./../components/splash.component.js";
import { BasketComponent } from "./../components/basket.component.js";
import { CheckoutComponent } from "../components/checkout.component.js";
import { TermsAndConditions } from "./../components/TermsAndContitions.js";
import { Privacy } from "./../components/Privacy.js";
import { Returns } from "./../components/Returns.js";
import { Delivery } from "./../components/Delivery.js";
import { PolicyComponent } from "../components/policy.component.js";

import { WarehouseService } from "./../services/warehouse.service.js";
import { BasketService } from "../services/basket.service.js";
import { MessageService } from "../services/message.service.js";
import { CategoriesService } from "../services/categories.service.js";

const appRoutes: Routes = [
  { path: '', component: SplashComponent},
  { path: 'basket', component: BasketComponent },
  { path: 'categories/:category', component: ProductsListComponent},
  { path: 'search/:searchQuery', component: ProductsListComponent},
  { path: 'product/:id', component: SingleProductComponent},
  { path: 'checkout', component: CheckoutComponent},
  { path: 'policy/termsandconditions', component: TermsAndConditions },
  { path: 'policy/privacy', component: Privacy },
  { path: 'policy/returns', component: Returns },
  { path: 'policy/delivery', component: Delivery } 
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false} // <-- debugging purposes only
    ),
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SplashComponent,
    ProductsListComponent,
    SingleProductComponent,
    BasketComponent,
    CheckoutComponent,
    TermsAndConditions,
    Privacy,
    Returns,
    Delivery,
    PolicyComponent
  ],
  providers: [WarehouseService, MessageService, BasketService, CategoriesService],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
