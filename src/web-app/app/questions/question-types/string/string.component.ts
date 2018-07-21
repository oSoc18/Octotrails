import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Question } from '../../question';
import { Data } from '../../../shared/providers/data.provider';
import { QuestionService } from '../../questions.service';

@Component({
  selector: 'app-question-type-string',
  templateUrl: './string.component.html',
  styleUrls: ['./string.component.css']
})
export class StringComponent implements OnInit {
  @Input() question: Question;
  @Output() questionChange: EventEmitter<object> = new EventEmitter<object>();

  answer: string;
  constructor(private questionService: QuestionService) {}

  ngOnInit() {}

  sendAnswer() {
    const value = { question_id: this.question.id, answer: this.answer };
    this.questionChange.emit(value);
    this.questionService.addToLocalStorage(value);
  }
}
