import { Injectable } from '@angular/core';
import { Stop } from '../../stops/stop';

@Injectable({
  providedIn: 'root'
})
export class Storage {
  storage = window.localStorage;

  saveAnswer(questionId: string, answer: any) {}

  getAnswers() {}
}
