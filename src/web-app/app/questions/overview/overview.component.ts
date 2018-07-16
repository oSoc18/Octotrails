import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { Question } from '../question';
import { QuestionService } from '../questions.service';
import questionsMock from '../../shared/mock/questions.mock';

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
    private questionService: QuestionService,
    private location: Location
  ) {
    console.log(this.questions);
  }

  ngOnInit() {
    this.getQuestions();
  }

   getQuestions(): void {
       this.questions = questionsMock[0];
//     this.questionService
//       .getQuestions()
//       .subscribe(list => console.log(this.questions = list));
}

  goBack(): void {
    this.location.back();
  }
}
