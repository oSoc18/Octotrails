import { Component, OnInit } from '@angular/core';
import { Line } from '../line';
import { LineService } from '../line.service';

@Component({
  templateUrl: './line-list.component.html',
  styleUrls: ['./line-list.component.scss']
})
export class LineListComponent implements OnInit {
  lines: Line[] = [];

  constructor(private lineService: LineService) {}

  ngOnInit() {
    this.getLines();
  }

  getLines(): void {
    this.lineService.getLines().subscribe(lines => (this.lines = lines));
  }
}
