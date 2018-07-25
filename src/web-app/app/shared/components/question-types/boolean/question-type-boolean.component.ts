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
  questionsDiv: HTMLCollectionOf<Element>;

  constructor() {}

  ngOnInit() {
    window.addEventListener('scroll', this.runOnScroll);
    if (this.answer) {
      this.isReadOnly = true;
    }
  }

  buttonClicked(event: Event) {
    // ? Click on the same button ?
    if (this.activeButton === event.currentTarget) {
      return;
    }
    this.activeButton = event.currentTarget;
    this.answer = this.activeButton.value;
    this.sendAnswer();
  }

  runOnScroll(event) {
    this.questionsDiv = document.getElementsByClassName('boolean-component');
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
    this.questionsDiv = document.getElementsByClassName('boolean-component');

    for (let i = 0; i < this.questionsDiv.length; i++) {
        this.questionsDiv[i].classList.remove('mystyle');
    }
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
