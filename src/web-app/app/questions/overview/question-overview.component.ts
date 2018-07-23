import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { Question } from '../question';
import { QuestionService } from '../questions.service';
import questionsMock from '../../shared/mock/questions.mock';
import { Data } from '../../shared/providers/data.provider';

@Component({
  selector: 'app-questions-overview',
  templateUrl: './question-overview.component.html',
  styleUrls: ['./question-overview.component.css']
})
export class QuestionOverviewComponent implements OnInit {
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
    this.questionService.addToLocalStorage(value);
  }

  goBack(): void {
    this.location.back();
  }

  saveAnswers() {
    // Get the storage answers
    const answers = Object.entries(localStorage).map(
      ([question_id, answer]) => ({ question_id, answer })
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
