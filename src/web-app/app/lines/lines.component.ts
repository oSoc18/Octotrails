import { Component, OnInit } from '@angular/core';
import { Line } from './line';
import { LineService } from './line.service';

@Component({
  templateUrl: './lines.component.html',
  styleUrls: ['./lines.component.scss']
})
export class LinesComponent implements OnInit {
  lines: Line[];
  selectedLine: Line;

  constructor(private lineService: LineService) {}

  ngOnInit() {
    debugger;
    this.getLines();
  }

  getLines(): void {
    this.lineService.getLines().subscribe(lines => (this.lines = lines));
  }
  
  
  onSelect(line: Line): void {
    this.selectedLine = line;
  }
}
