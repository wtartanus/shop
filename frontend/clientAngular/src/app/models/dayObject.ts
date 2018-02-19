import { Injectable } from '@angular/core';

@Injectable()
export class DayObject {
    public value: any;
    public display: string;
    public week: number;
    public isCurrentMonth: boolean;
    public isPast: boolean;
    public isSelected: boolean;

    constructor(display: string, week: number, isCurrentMonth: boolean, isPast: boolean) {
      this.display = display;
      this.week = week;
      this.isCurrentMonth = isCurrentMonth;
      this.isPast = isPast
      this.isSelected = false;
    }

    public setValue(value: any): void {
      this.value = value;
    }

    public select(): void {
      this.isSelected = true;
    }

    public deselect(): void {
      this.isSelected = false;
    }

}