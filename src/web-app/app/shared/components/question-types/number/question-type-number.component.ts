import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Question } from '../../../../questions/question';

@Component({
  selector: 'app-question-type-number',
  templateUrl: './question-type-number.component.html',
  styleUrls: ['./question-type-number.component.css']
})
export class QuestionTypeNumberComponent implements OnInit {
  @Input() question: Question;
  @Output('answer')
  questionChange: EventEmitter<object> = new EventEmitter<object>();

  answer: number;

  constructor() {}

  ngOnInit() {
    this.answer = this.question.answer;
  }

  sendAnswer() {
    const value = { question_id: this.question.id, answer: this.answer };
    this.questionChange.emit(value);
  }
}
