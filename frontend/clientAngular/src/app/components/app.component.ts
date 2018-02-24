import {Component, OnInit, OnDestroy} from '@angular/core';
import {IMyOptions, IMyDateModel} from 'mydatepicker';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
declare var jquery:any;
declare var $ :any;
declare var FilmRoll:any;
// import { Subscription } from 'rxjs/Subscription';
// import 'rxjs/add/operator/toPromise';

import { HeaderComponent } from "./../components/header.component.js";
import { ProductsComponent } from "./../components/products.component.js";
import { SplashComponent } from "./../components/splash.component.js";
import { FooterComponent } from "./../components/footer.component.js";

// import {CommonService} from './../services/common.service.js';
// import {SearchService} from './../services/search.service.js';
// import {MessageService} from './../services/message.service.js';
// import { WindowSize } from './../models/windowSize.js';
// import { Inspiration } from './../models/inspiration.js';
// declare var google: any;

@Component({
  selector: 'my-app',
  templateUrl: 'src/app/views/app.component.html',
  // providers: [CommonService],
  entryComponents: [HeaderComponent]
})
// export class AppComponent implements OnInit, OnDestroy {
export class AppComponent implements OnInit {
    public selectedCategory: string = null; //This should be null when in home page

    ngOnInit() {
      
    }

    onCategoryChange(category: string): void {
      this.selectedCategory = category;
    }

//   constructor(private commonService: CommonService, private searchService: SearchService, private messageService: MessageService) { 
//     this.substriction = this.messageService.getMessage().subscribe(message => this.updateDates(message));
//   };


//   ngOnInit(): void {
//     this.windowSize = this.commonService.getWindowSize();
//     let input = document.getElementById('locationTextField');
//     let autocomplete = new google.maps.places.Autocomplete(input);
//     if (this.windowSize.getWidth() >= 1200) {
//       this.height = '56.79px';
//       this.width = '100%';
//     }

//     this.departOptions = this.setOptions(false);
//     this.returnOptions = this.setOptions(true);
//   }

//   ngOnDestroy(): void {
//      this.substriction.unsubscribe();
//   }

}
