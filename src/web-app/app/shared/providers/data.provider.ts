import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Data {
  public stop: any;
  public inputs: any = {};

  public constructor() {}

  public get answers() {
    return Object.entries(this.inputs).map(([key, value]) => value);
  }
}
