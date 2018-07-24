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
  answeredQuestions = 0;
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
    });

  }
  getAnswer(value) {
    this.data.inputs[value.question_id] = value;
    this.setProgressBar(value);
  }

  setProgressBar(value) {
    if(value.answer !== null){
        this.answeredQuestions = Object.keys(this.data.inputs).length;
        this.progressValue = (100 / this.totalNumberOfQuestions) * this.answeredQuestions;
    } else {
        delete this.data.inputs[value.question_id];
        this.answeredQuestions = this.answeredQuestions - 1;
        this.progressValue = (100 / this.totalNumberOfQuestions) * this.answeredQuestions; 
    }  
  }


  goBack(): void {
    this.location.back();
  }

  saveAnswers() {
    let keys = [];
    let values = [];
    let answers = [];

    for (let i = 0; i < localStorage.length; i++) {
      keys.push(localStorage.key(i));
      values.push(localStorage.getItem(keys[i]));
      answers.push({ question_id: keys[i], answer: values[i] });
    }
    
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
