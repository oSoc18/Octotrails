import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-question-type-string',
  templateUrl: './string.component.html',
  styleUrls: ['./string.component.css']
})
export class StringComponent implements OnInit {
  @Input() title:string;
  constructor() { }

  ngOnInit() {
  }

}
