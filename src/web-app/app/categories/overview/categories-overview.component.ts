import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '../category';
import { MAT_CHIPS_DEFAULT_OPTIONS } from '@angular/material';

@Component({
  templateUrl: './categories-overview.component.html',
  styleUrls: ['./categories-overview.component.css']
})
export class CategoriesOverviewComponent implements OnInit {
  categories: Category[];
  categories_group: any;

  constructor(private route: ActivatedRoute, private router: Router) {}

  /**
   * Get the categories and put them in an object
   */
  ngOnInit() {
    this.categories = this.route.snapshot.data['categories'];
    this.categories_group = this.categories.reduce((list, cat: Category) => {
      const { num, parent_num } = cat;
      const parent_cat = list[parent_num] || [];
      if (parent_num !== null) {
        parent_cat.push(num);
        list[parent_num] = parent_cat;
      } else {
        list[num] = [];
      }
      return list;
    }, {});
  }

  /**
   * Find a subcategory by its num
   * @param subCategoryNum The num of the subcategory
   */
  findSubCategory(subCategoryNum) {
    return this.categories.find(c => c.num === subCategoryNum) || {};
  }

  /**
   * Go to the questions for a specific category
   * @param categoryNum The num of the (sub)category
   */
  goToQuestion(categoryNum) {
    this.router.navigate(['./', categoryNum, 'questions'], {
      relativeTo: this.route
    });
  }
}
