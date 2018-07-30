import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { MatSnackBar, MatDialog } from '@angular/material';

import { QuestionService } from '../question.service';
import { Data } from '../../shared/providers/data.provider';
import { Category } from '../category';
import { DialogConfirmComponent } from '../../shared/components';
import { map } from 'rxjs/operators';

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

  categoryName: string;
  categoryParentName: string;

  public get isDoneBtnDisabled(): boolean {
    return this.answeredQuestions == 0;
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private questionService: QuestionService,
    private data: Data,
    public snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  /**
   * Get the stop id
   * Get the questions
   * Get the category
   * Get the total number of questions
   */
  ngOnInit() {
    this.stop_id = this.route.parent.snapshot.paramMap.get('stop_id');
    this.questions = this.route.snapshot.data['questions'];
    this.category = this.route.snapshot.data['category'];
    this.totalNumberOfQuestions = this.questions.length;
    if (this.category.parent) {
      this.categoryParentName = this.category.parent.name;
      this.categoryName = this.category.name;
    } else {
      this.categoryName = null;
      this.categoryParentName = this.category.name;
    }
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
      if (this.answeredQuestions > 0) this.answeredQuestions -= 1;
    }
    this.progressValue =
      (100 / this.totalNumberOfQuestions) * this.answeredQuestions;
  }

  /**
   * Get the answers from the localStorage and save them to the database
   */
  saveAnswers() {
    // Get the storage answers
    const answers = Object.entries(localStorage).map(
      ([question_num, answer]) => ({ question_num, answer })
    );

    return this.questionService
      .saveAnswers(this.stop_id, answers)
      .subscribe(msg => {
        return this.router
          .navigate(['stops', this.stop_id, 'categories'])
          .then(_ =>
            this.snackBar.open("New stop's updates SAVED", 'Undo', {
              duration: 2500
            })
          );
      });
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      width: '250px'
    });

    return dialogRef.afterClosed().pipe(map(result => result == 'true'));
  }

  /**
   * Show popup
   * save answers or clear localStorage depending on the answer from the popup
   */
  cancel() {
    if (!this.isDoneBtnDisabled) {
      // const OK = window.confirm('Do you want to save your progress?');
      this.openDialog().subscribe(wantTosave => {
        if (wantTosave) {
          this.saveAnswers();
        } else {
          // this.questionService.clearAnswers();
          localStorage.clear();
        }
        return this.router.navigate(['stops', this.stop_id, 'categories']);
      });
    }
  }
}
