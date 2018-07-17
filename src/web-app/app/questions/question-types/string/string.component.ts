import { Component, OnInit, Input,  Output, EventEmitter } from '@angular/core';
import { Question } from '../../question';
import { Data } from '../../../shared/providers/data.provider';

@Component({
  selector: 'app-question-type-string',
  templateUrl: './string.component.html',
  styleUrls: ['./string.component.css']
})
export class StringComponent implements OnInit {
    @Input() question: Question;
    @Output('answer')
    outputAnswer: EventEmitter<object> = new EventEmitter<object>();
  
    answer: string;
  constructor() { }

  ngOnInit() {
  }

  sendAnswer() {
    const value = { question_id: this.question.id, answer: this.answer };
    this.outputAnswer.emit(value);
  }

}
