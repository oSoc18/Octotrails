import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Question } from '../../../../categories/question';

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
  questionsDiv: HTMLCollectionOf<Element>;

  constructor() {}

  ngOnInit() {
    this.isReadOnly = !!this.answer;
    window.addEventListener('scroll', this.runOnScroll);
  }

  infoClicked(event) {
    let yPos = event.currentTarget.getBoundingClientRect().y + 50;
    let infoText = event.currentTarget.parentElement.nextSibling;
    infoText.classList.toggle('info-active');
    infoText.style.top = 'infoText';
  }

  runOnScroll(event) {
    this.questionsDiv = document.getElementsByClassName('string-component');
    for (let i = 0; i < this.questionsDiv.length; i++) {
      let positionY = this.questionsDiv[i].getBoundingClientRect().top;
      if (positionY <= 400 && positionY >= 300) {
        this.questionsDiv[i].classList.add('mystyle');
      } else if (positionY < 300 || positionY > 400) {
        this.questionsDiv[i].classList.remove('mystyle');
      }
    }
  }

  sendAnswer() {
    const value = { question_num: this.question.num, answer: this.answer };
    this.answerChange.emit(value);
  }
}
