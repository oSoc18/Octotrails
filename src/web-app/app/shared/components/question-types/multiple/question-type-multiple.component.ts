import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Question } from '../../../../categories/question';

@Component({
  selector: 'app-question-type-multiple',
  templateUrl: './question-type-multiple.component.html',
  styleUrls: ['./question-type-multiple.component.css']
})
export class QuestionTypeMultipleComponent implements OnInit {
  @Input() question: Question;
  @Input() answer;
  @Output('answer')
  answerChange: EventEmitter<object> = new EventEmitter<object>();

  btnClass;
  activeButton = null;

  constructor() {}

  ngOnInit() {
    this.btnClass = ['button'];
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
    this.setClass(this.activeButton == event.currentTarget);
    this.answer = this.activeButton.value;
    this.sendAnswer();
  }

  sendAnswer() {
    const value = { question_id: this.question.id, answer: this.answer };
    this.answerChange.emit(value);
  }
}
