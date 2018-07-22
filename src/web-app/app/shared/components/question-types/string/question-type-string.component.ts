import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Question } from '../../../../questions/question';

@Component({
  selector: 'app-question-type-string',
  templateUrl: './question-type-string.component.html',
  styleUrls: ['./question-type-string.component.css']
})
export class QuestionTypeStringComponent implements OnInit {
  @Input() question: Question;
  @Output('answer')
  questionChange: EventEmitter<object> = new EventEmitter<object>();

  answer: string;
  constructor() {}

  ngOnInit() {}

  sendAnswer() {
    const value = { question_id: this.question.id, answer: this.answer };
    this.questionChange.emit(value);
  }
}
