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

  /**
   * Get the stop id 
   * Get the questions
   * Get the category
   * Get the total number of questions
   */
  ngOnInit() {
    this.stop_id = this.route.snapshot.queryParamMap.get('stop_id');
    this.questions = this.route.snapshot.data['questions'];
    this.category = this.route.snapshot.data['category'];
    this.totalNumberOfQuestions = this.questions.length;
  }

  /**
   * Set the answer that the user put in to local variable
   * Store the answer
   * Change the progressbar
   * @param value The value that the user put in
   */
  getAnswer(value) {
    this.data.inputs[value.question_num] = value;
    this.questionService.storeAnswer(value);
    this.setProgressBar(value);
  }

  /**
   * Change the progressbar on the page
   * @param value The value that the user put in
   */
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

  /**
   * Go back to the previous location
   */
  goBack(): void {
    this.location.back();
  }

  /**
   * Get the answers from the localStorage and save them to the database
   */
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

  /**
   * Show popup 
   * save answers or clear localStorage depending on the answer from the popup
   */
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
