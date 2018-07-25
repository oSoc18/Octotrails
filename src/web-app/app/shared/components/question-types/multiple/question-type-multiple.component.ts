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
  isReadOnly: true;
  questionsDiv: HTMLCollectionOf<Element>;

  constructor() {}

  ngOnInit() {
    window.addEventListener('scroll', this.runOnScroll);
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

  infoClicked(event) {
    let yPos = event.currentTarget.getBoundingClientRect().y + 50;
    let infoText = event.currentTarget.parentElement.nextSibling;
    infoText.classList.toggle('info-active');
    infoText.style.top = 'infoText';
  }

  runOnScroll(event) {
    this.questionsDiv = document.getElementsByClassName('multiple-component');
    for (let i = 0; i < this.questionsDiv.length; i++) {
      let positionY = this.questionsDiv[i].getBoundingClientRect().top;
      if (positionY <= 380 && positionY >= 300) {
        this.questionsDiv[i].classList.add('mystyle');
      } else if (positionY < 300 || positionY > 380) {
        this.questionsDiv[i].classList.remove('mystyle');
      }
    }
  }

  openAnswer(event) {
    this.removeMystyle();
    event.currentTarget.parentElement.parentElement.classList.add('mystyle');
  }

  removeMystyle(){
    this.questionsDiv = document.getElementsByClassName('multiple-component');

    for (let i = 0; i < this.questionsDiv.length; i++) {
        this.questionsDiv[i].classList.remove('mystyle');
    }
  }

  sendAnswer() {
    const value = { question_num: this.question.num, answer: this.answer };
    this.answerChange.emit(value);
  }
}
