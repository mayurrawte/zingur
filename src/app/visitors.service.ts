import { Injectable } from '@angular/core';

@Injectable()
export class VisitorsService {
  quizId = null;
  Questions = [];
  challengingUser = null;
  loaded = false;
  recData = null;
  constructor() { }
}
