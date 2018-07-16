import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Question } from '../../question';
import { Data } from '../../../shared/providers/data.provider';

@Component({
  selector: 'app-question-type-number',
  templateUrl: './number.component.html',
  styleUrls: ['./number.component.css']
})
export class NumberComponent implements OnInit {

  @Input()
  question:Question;

  @Output()
  outputAnswer: EventEmitter<Object> = new EventEmitter<Object>();

  constructor(private data:Data) { }

  ngOnInit() {
  }

  sendAnswer(value) {
      const answer = {question_id : this.question.id, answer : value };
    this.outputAnswer.emit(answer);
    this.data.inputs.push(answer);
  }


}
