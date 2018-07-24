import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Question } from '../../../../categories/question';

@Component({
  selector: 'app-question-type-number',
  templateUrl: './question-type-number.component.html',
  styleUrls: ['./question-type-number.component.css']
})
export class QuestionTypeNumberComponent implements OnInit {
  @Input() question: Question;
  @Input() answer;
  @Output('answer')
  answerChange: EventEmitter<object> = new EventEmitter<object>();

  isReadOnly: boolean;

  constructor() {}

  ngOnInit() {
    this.isReadOnly = !!this.answer;
  }

  infoClicked(event) {
    let yPos = event.currentTarget.getBoundingClientRect().y + 50;
    let infoText = event.currentTarget.parentElement.nextSibling;
    infoText.classList.toggle('info-active');
    infoText.style.top = 'infoText';
  }

  sendAnswer() {
    const value = { question_num: this.question.num, answer: this.answer };
    this.answerChange.emit(value);
  }
}
