import { NgModule }       from "@angular/core";
import { BrowserModule }  from "@angular/platform-browser";
import { FormsModule }    from "@angular/forms";
import { HttpModule }       from "@angular/http";
// import { MyDatePickerModule } from "mydatepicker";
// import { ChartModule } from "angular2-highcharts";

import { AppComponent } from "./../components/app.component.js";
import { HeaderComponent } from "./../components/header.component.js";
import { ModelSliderComponent } from "./../components/modelSlider.component.js";
import { HeaderSliderComponent } from "./../components/headerSlider.component.js";
import { ProductsComponent } from "./../components/products.component.js";
import { SingleProductComponent } from "./../components/singleProduct.component.js";
import { ProductsListComponent } from "./../components/productsList.component.js";
import { FooterComponent } from "./../components/footer.component.js";
import { SplashComponent } from "./../components/splash.component.js";
import { BasketComponent } from "./../components/basket.component.js";

import { WarehouseService } from "./../services/warehouse.service.js";
import { BasketService } from "../services/basket.service.js";
import { MessageService } from "../services/message.service.js";

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
    // MyDatePickerModule,
    // ChartModule.forRoot(require("highcharts"), require("highcharts/highcharts-3d"), require("highcharts/modules/exporting"))
  ],
  declarations: [
    AppComponent,
    HeaderComponent,
    HeaderSliderComponent,
    ModelSliderComponent,
    FooterComponent,
    SplashComponent,
    ProductsComponent,
    ProductsListComponent,
    SingleProductComponent,
    BasketComponent
  ],
  providers: [WarehouseService, MessageService, BasketService],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
