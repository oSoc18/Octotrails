import { Component, OnInit, Input } from '@angular/core';
import { QuestionService } from '../questions.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  @Input() categories;

  constructor(private questionService: QuestionService) { }

  ngOnInit() {
    this.getCategories();
  }

  getCategories(): void {
    this.questionService.getCategories().subscribe(list => {
      this.categories = list;
    });
  }
}
