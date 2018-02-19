import { Injectable } from '@angular/core';

@Injectable()
export class Photo {
  public id: number;
  public cityId: number;
  public link: string;
  
  constructor(id: number, cityId: number, link: string) {
    this.id = id;
    this.cityId = cityId;
    this.link = link;
  }
}