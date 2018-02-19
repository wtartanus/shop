import { Injectable } from '@angular/core';

@Injectable()
export class Activity {
  public id: number;
  public cityId: number;
  public name: string;
  public desc: string;
  public imgLink: string;
  public address: string;
  
  constructor(id: number, cityId: number, city: string, desc: string, imgLink: string, address: string) {
    this.id = id;
    this.cityId = cityId;
    this.name = city;
    this.desc = desc;
    this.imgLink = imgLink;
    this.address = address;
  }
}