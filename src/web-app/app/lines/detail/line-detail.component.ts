import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { Line } from '../line';
import { LineService } from '../line.service';

import { slideInDownAnimation } from '../../shared/animations';

@Component({
  animations: [slideInDownAnimation],
  templateUrl: './line-detail.component.html',
  styleUrls: ['./line-detail.component.scss']
})
export class LineDetailComponent implements OnInit {
  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display') display = 'block';
  @HostBinding('style.position') position = 'absolute';

  @Input() line: Line;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private lineService: LineService,
    private location: Location
  ) {}

  ngOnInit() {
    this.getLine();
  }

  getLine(): void {
    const lineNumber: string = this.route.snapshot.paramMap.get('number');
    this.lineService
      .getLine(lineNumber)
      .subscribe(line => (this.line = line[0]));
  }

  goBack(): void {
    this.location.back();
  }

  gotoLines(line: Line) {
    let lineNumber = line ? line.number : null;
    // Pass along the line id if available
    // so that the LineList component can select that line.
    // Include a junk 'foo' property for fun.
    this.router.navigate(['/lines', { number: lineNumber, foo: 'foo' }]);
  }
}
