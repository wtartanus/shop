import {Component, OnInit} from '@angular/core';
import {IMyOptions, IMyDateModel} from 'mydatepicker';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import {CommonService} from './../services/common.service.js';
import { WindowSize } from './../models/windowSize.js';
import { Inspiration } from './../models/inspiration.js';

@Component({
  selector: 'inspirations',
  templateUrl: 'src/app/views/inspirations.component.html',
  providers: [CommonService]
})
export class InspirationsComponent implements OnInit {
  public inspirations: Array<Inspiration>;
  public selectedInspiration: Inspiration;
    private windowSize: WindowSize;
  public selectedSideNav: string;
  public showPhoto = false;

  constructor(private commonService: CommonService) { };

  ngOnInit(): void {
    this.windowSize = this.commonService.getWindowSize();
    this.getInspirations();
  }

  getInspirations(): void {
    this.commonService.getInspirations().then(inspirations => this.inspirations = this.commonService.createInspirationsModel(inspirations)).then(function() {
      this.selectedInspiration = this.inspirations[0];
    }.bind(this));
    this.selectedSideNav = "displayDescription";
  }

  changeItem(moveRight: boolean, item: string, inspirationIndex: number): void {
    let inspiration = inspirationIndex ? this.inspirations[inspirationIndex] : this.selectedInspiration;
    let value = item === "photoPosition" ? "photos" : "activities";
    if (moveRight) {
      let nowPosition = inspiration[item];
      nowPosition += 1;
      if (nowPosition > (inspiration[value].length - 1)) {
        nowPosition = 0;
      }
      inspiration[item] = nowPosition;
    } else {
      let nowPosition = inspiration[item];
      nowPosition -= 1;
      if (nowPosition < 0) {
        nowPosition = (inspiration[value].length - 1);
      }
      inspiration[item] = nowPosition;
    }
  }

  changeDisplay(item: string, inspirationIndex: number): void {
    let inspiration = inspirationIndex ? this.inspirations[inspirationIndex] : this.selectedInspiration;
    this.selectedSideNav = item;
    let keys = Object.keys(inspiration.menu);

    for (var i = 0; i < keys.length; i++) {
      if (inspiration.menu.hasOwnProperty(keys[i])) {
        if (keys[i] === item) {
          inspiration.menu[keys[i]] = true;
        } else {
          inspiration.menu[keys[i]] = false;
        }
      }
    }
  }

}
