import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Question } from '../../../../categories/question';

@Component({
  selector: 'app-question-type-boolean',
  templateUrl: './question-type-boolean.component.html',
  styleUrls: ['./question-type-boolean.component.css']
})
export class QuestionTypeBooleanComponent implements OnInit {
  @Input() question: Question;
  @Input() answer;
  @Output('answer')
  answerChange: EventEmitter<object> = new EventEmitter<object>();

  isReadOnly: boolean = false;
  activeButton;

  constructor() {}

  ngOnInit() {
    if (this.answer) {
      this.isReadOnly = true;
    }
  }

  buttonClicked(event) {
    // ? Click on the same button ?
    if (this.activeButton === event.currentTarget) {
      return;
    }
    this.activeButton = event.currentTarget;
    this.answer = this.activeButton.value;
    this.sendAnswer();
  }

  sendAnswer() {
    const value = { question_id: this.question.id, answer: this.answer };
    this.answerChange.emit(value);
  }
}
