import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { Question } from '../question';
import { QuestionService } from '../question.service';
import { Data } from '../../shared/providers/data.provider';
import { Category } from '../category';

@Component({
  templateUrl: './questions-overview.component.html',
  styleUrls: ['./questions-overview.component.css']
})
export class QuestionsOverviewComponent implements OnInit {
  @Input() questions;
  answeredQuestions = 0;
  totalNumberOfQuestions;
  progressValue = 0;
  stop_id: string;
  category: Category;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private questionService: QuestionService,
    private data: Data
  ) {}

  ngOnInit() {
    this.stop_id = this.route.snapshot.queryParamMap.get('stop_id');
    this.questions = this.route.snapshot.data['questions'];
    this.category = this.route.snapshot.data['category'];
    this.totalNumberOfQuestions = this.questions.length;
  }

  getAnswer(value) {
    console.log(value);
    this.data.inputs[value.question_num] = value;
    this.questionService.storeAnswer(value);
    this.setProgressBar(value);
  }

  setProgressBar(value) {
    if (value.answer !== null) {
      this.answeredQuestions = Object.keys(this.data.inputs).length;
    } else {
      delete this.data.inputs[value.question_num];
      this.answeredQuestions -= 1;
    }
    this.progressValue =
      (100 / this.totalNumberOfQuestions) * this.answeredQuestions;
  }

  goBack(): void {
    this.location.back();
  }

  saveAnswers() {
    // Get the storage answers
    const answers = Object.entries(localStorage).map(
      ([question_num, answer]) => ({ question_num, answer })
    );
    this.router.navigate(['/stops', this.stop_id]);

    return this.questionService
      .saveAnswers(this.stop_id, answers)
      .subscribe(msg => console.log(msg));
  }

  cancel() {
    const OK = window.confirm('Do you want to save your progress?');

    if (OK) {
      this.saveAnswers();
    } else {
      localStorage.clear();
    }

    this.router.navigate(['/stops', this.stop_id]);
  }
}
