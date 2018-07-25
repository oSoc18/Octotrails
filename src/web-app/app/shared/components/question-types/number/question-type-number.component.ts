import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Question } from '../../../../categories/question';
import { questions } from '../../../mock';

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
    this.questionsDiv = document.getElementsByClassName('number-component');
    for (let i = 0; i < this.questionsDiv.length; i++) {
      let positionY = this.questionsDiv[i].getBoundingClientRect().top;
      if (positionY <= 400 && positionY >= 300) {
        this.questionsDiv[i].classList.add('mystyle');
      } else if (positionY < 300 || positionY > 400) {
        this.questionsDiv[i].classList.remove('mystyle');
      }
    }
  }

  openAnswer(event) {
    this.removeMystyle();
    event.currentTarget.parentElement.parentElement.classList.add('mystyle');
  }

  removeMystyle(){
    this.questionsDiv = document.getElementsByClassName('number-component');

    for (let i = 0; i < this.questionsDiv.length; i++) {
        this.questionsDiv[i].classList.remove('mystyle');
    }
  }

  sendAnswer() {
    const value = { question_num: this.question.num, answer: this.answer };
    this.answerChange.emit(value);
  }
}
