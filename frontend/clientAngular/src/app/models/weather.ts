import { Injectable } from '@angular/core';

@Injectable()
export class Weather {
  public id: number;
  public cityId: number;
  public temperatures: number[];
  
  constructor(id: number, cityId: number, temperatures: number[]) {
    this.id = id;
    this.cityId = cityId;
    this.temperatures = temperatures;
  }
}