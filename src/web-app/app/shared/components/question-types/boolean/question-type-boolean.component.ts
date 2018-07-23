import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Question } from '../../../../questions/question';

@Component({
  selector: 'app-question-type-boolean',
  templateUrl: './question-type-boolean.component.html',
  styleUrls: ['./question-type-boolean.component.css']
})
export class QuestionTypeBooleanComponent implements OnInit {
  @Input() question: Question;
  @Input() answer;
  @Output() answerChange: EventEmitter<object> = new EventEmitter<object>();

  activeButton = null;
  btnClass;

  constructor() {}

  ngOnInit() {
    this.answer = this.answer === 'true';
  }

  private setClass(active: boolean = false) {
    this.btnClass = { button: true, active: active };
  }

  buttonClicked(event) {
    if (this.activeButton !== event.currentTarget) {
      this.activeButton = event.currentTarget;
    } else {
      this.activeButton = null;
    }
    const isBtnActive = this.activeButton == event.currentTarget;
    this.answer = this.activeButton.value;
    this.setClass(isBtnActive);
    this.sendAnswer();
  }

  sendAnswer() {
    const value = { question_id: this.question.id, answer: this.answer };
    this.answerChange.emit(value);
  }
}
