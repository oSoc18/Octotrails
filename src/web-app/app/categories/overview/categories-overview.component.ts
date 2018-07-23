import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category } from '../category';

@Component({
  templateUrl: './categories-overview.component.html',
  styleUrls: ['./categories-overview.component.css']
})
export class CategoriesOverviewComponent implements OnInit {
  categories: Category[];

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.categories = this.route.snapshot.data['categories'];
  }
}
