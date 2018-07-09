import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'mh-star',
  styleUrls: ['./star.component.scss'],
  template: `
    <div class="crop" [style.width]="starPercent" [title]="rating">
    <div style="width: 86px">
        <span class="glyphicon glyphicon-star"></span>
        <span class="glyphicon glyphicon-star"></span>
        <span class="glyphicon glyphicon-star"></span>
        <span class="glyphicon glyphicon-star"></span>
        <span class="glyphicon glyphicon-star"></span>
    </div>

    `
})
export class StarComponent implements OnChanges {
  @Input() rating: number;
  starPercent: string;

  ngOnChanges(): void {
    // Convert x out of 5 starts
    // to y out of 86px width
    this.starPercent = (this.rating * 86) / 5 + 'px';
  }
}
