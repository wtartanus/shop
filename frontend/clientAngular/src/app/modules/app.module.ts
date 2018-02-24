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
import { FooterComponent } from "./../components/footer.component.js";
import { SplashComponent } from "./../components/splash.component.js";

// import { CommonService } from "./../services/common.service.js";
// import { SearchService } from "./../services/search.service.js";
// import {SearchResultService } from "./../services/searchResult.service.js";
// import { MessageService } from "./../services/message.service.js";
// import { WindowSize } from "./../models/windowSize.js";
// import { Inspiration } from "./../models/inspiration.js";
// import { Activity } from "./../models/activity.js";
// import { City } from "./../models/city.js";
// import { Photo } from "./../models/photo.js";
// import { Weather } from "./../models/weather.js";
// import { DayObject } from "./../models/dayObject.js"



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
    ProductsComponent
  ],
  // providers: [CommonService, SearchService, SearchResultService, MessageService, WindowSize, Inspiration, Activity, City, Photo, Weather, DayObject],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
