import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { Question } from '../question';
import { QuestionService } from '../questions.service';
import questionsMock from '../../shared/mock/questions.mock';
import { Data } from '../../shared/providers/data.provider';

@Component({
  selector: 'app-questions-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {
  @Input() questions;
  progressValue = 10;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private questionService: QuestionService,
    private data: Data
  ) {}

  ngOnInit() {
    this.getQuestions();
  }

  getQuestions(): void {
    //  this.questions = questionsMock;
    this.questionService
      .getQuestions()
      .subscribe(list => (this.questions = list));
  }
  getAnswer(value) {
    this.data.inputs[value.question_id] = value;
  }

  goBack(): void {
    this.location.back();
  }
}
