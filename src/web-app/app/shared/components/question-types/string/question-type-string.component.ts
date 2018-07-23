import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Question } from '../../../../questions/question';

@Component({
  selector: 'app-question-type-string',
  templateUrl: './question-type-string.component.html',
  styleUrls: ['./question-type-string.component.css']
})
export class QuestionTypeStringComponent implements OnInit {
  @Input() question: Question;
  @Input() answer;
  @Output('answer')
  answerChange: EventEmitter<object> = new EventEmitter<object>();

  isReadOnly: boolean;

  constructor() {}

  ngOnInit() {
    this.isReadOnly = !!this.answer;
  }

  sendAnswer() {
    const value = { question_id: this.question.id, answer: this.answer };
    this.answerChange.emit(value);
  }
}
