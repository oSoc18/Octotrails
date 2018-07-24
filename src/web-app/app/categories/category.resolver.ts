import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Resolve
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { CategoryService } from './category.service';
import { Category } from './category';
import { Question } from './question';

@Injectable({
  providedIn: 'root'
})
export class CategoryResolver implements Resolve<Category[]> {
  constructor(private categoryService: CategoryService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Category[]> {
    return this.categoryService.list();
  }
}

@Injectable({
  providedIn: 'root'
})
export class CategoryQuestionsResolver implements Resolve<Question[]> {
  constructor(private categoriesService: CategoryService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Question[]> {
    const category_num = route.paramMap.get('category_num');
    return this.categoriesService.getQuestions(category_num);
  }
}
