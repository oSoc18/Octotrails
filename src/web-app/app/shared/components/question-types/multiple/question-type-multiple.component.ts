import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Question } from '../../../../questions/question';

@Component({
  selector: 'app-question-type-multiple',
  templateUrl: './question-type-multiple.component.html',
  styleUrls: ['./question-type-multiple.component.css']
})
export class QuestionTypeMultipleComponent implements OnInit {
  activeButton = null;
  @Input() question: Question;
  @Output('answer')
  questionChange: EventEmitter<object> = new EventEmitter<object>();
  answer: string;

  constructor() {}

  ngOnInit() {}

  buttonClicked(event) {
    if (this.activeButton !== event.currentTarget) {
      if (this.activeButton !== null) {
        this.activeButton.classList.remove('active');
      }
      this.activeButton = event.currentTarget;
      event.currentTarget.classList.add('active');
      this.answer = this.activeButton.value;
      this.sendAnswer();
    } else {
      this.activeButton.classList.remove('active');
      this.activeButton = null;
      this.answer = this.activeButton.value;
      this.sendAnswer();
    }
  }

  sendAnswer() {
    const value = { question_id: this.question.id, answer: this.answer };
    this.questionChange.emit(value);
  }
}
