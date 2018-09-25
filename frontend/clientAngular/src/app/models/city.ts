import {Injectable} from '@angular/core';

@Injectable()
export class City {
  public id: number;
  public name: string;
  public history: string;
  public description: string;
  
  constructor(id: number, name: string, history: string, description: string) {
     this.id = id;
     this.name = name;
     this.history = history;
     this.description = description;
  }
}