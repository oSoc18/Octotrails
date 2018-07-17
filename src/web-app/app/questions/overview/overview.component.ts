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
  answeredQuestions = 1;
  totalNumberOfQuestions;
  progressValue = 0;
  stop_id: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private questionService: QuestionService,
    private data: Data
  ) {}

  ngOnInit() {
    this.stop_id = this.route.snapshot.queryParamMap.get('stop_id');
    this.getQuestions();
  }

  getQuestions(): void {
    //  this.questions = questionsMock;
    this.questionService.getQuestions().subscribe(list => {
      this.questions = list;
      this.totalNumberOfQuestions = this.questions.length;
      this.progressValue =
        (100 / this.totalNumberOfQuestions) * this.answeredQuestions;
    });
  }
  getAnswer(value) {
    this.data.inputs[value.question_id] = value;
    console.log(this.data);
  }

  goBack(): void {
    this.location.back();
  }

  saveAnswers() {
    this.questionService
      .saveAnswers(this.stop_id, this.data.answers)
      .subscribe(msg => alert(msg));
  }
}
