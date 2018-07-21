import { Injectable } from '@angular/core';
import { Stop } from '../../stops/stop';

@Injectable({
  providedIn: 'root'
})
export class Data {
  public stop: Stop;
  public inputs: any = {};

  public constructor() {}

  public get answers() {
    return Object.entries(this.inputs).map(([key, value]) => value);
  }
}
