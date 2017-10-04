import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';

@Injectable()
export class DataService {
  hostname =  window.location.hostname;
  defaultQuestions = [
    {'id': 20, 'question': 'Which pet do you like to owe ?', 'options': ['Kutta', 'Billi', 'MagarMacccha', 'Ghadiyal']},
    {'id': 21, 'question': 'Where do you want to go ?', 'options': ['Goa', 'JagdalPur', 'Mysore', 'Leh']},
    {'id': 22, 'question': 'Which pet do you like to owe ?', 'options': ['Kutta', 'Billi', 'MagarMacccha', 'Ghadiyal']},
    {'id': 23, 'question': 'Where do you want to go ?', 'options': ['Goa', 'JagdalPur', 'Mysore', 'Leh']},
    {'id': 24, 'question': 'Which pet do you like to owe ?', 'options': ['Kutta', 'Billi', 'MagarMacccha', 'Ghadiyal']},
    {'id': 25, 'question': 'Where do you want to go ?', 'options': ['Goa', 'JagdalPur', 'Mysore', 'Leh']},
    {'id': 26, 'question': 'Which pet do you like to owe ?', 'options': ['Kutta', 'Billi', 'MagarMacccha', 'Ghadiyal']},
    {'id': 27, 'question': 'Where do you want to go ?', 'options': ['Goa', 'JagdalPur', 'Mysore', 'Leh']},
    {'id': 28, 'question': 'Which pet do you like to owe ?', 'options': ['Kutta', 'Billi', 'MagarMacccha', 'Ghadiyal']},
    {'id': 29, 'question': 'Where do you want to go ?', 'options': ['Goa', 'JagdalPur', 'Mysore', 'Leh']},
    {'id': 30, 'question': 'Which pet do you like to owe ?', 'options': ['Kutta', 'Billi', 'MagarMacccha', 'Ghadiyal']},
    {'id': 31, 'question': 'Where do you want to go ?', 'options': ['Goa', 'JagdalPur', 'Mysore', 'Leh']},
    {'id': 32, 'question': 'Which pet do you like to owe ?', 'options': ['Kutta', 'Billi', 'MagarMacccha', 'Ghadiyal']},
    {'id': 33, 'question': 'Where do you want to go ?', 'options': ['Goa', 'JagdalPur', 'Mysore', 'Leh']},
    {'id': 34, 'question': 'Which pet do you like to owe ?', 'options': ['Kutta', 'Billi', 'MagarMacccha', 'Ghadiyal']},
    {'id': 35, 'question': 'Where do you want to go ?', 'options': ['Goa', 'JagdalPur', 'Mysore', 'Leh']},
    {'id': 36, 'question': 'Which pet do you like to owe ?', 'options': ['Kutta', 'Billi', 'MagarMacccha', 'Ghadiyal']},
    {'id': 37, 'question': 'Where do you want to go ?', 'options': ['Goa', 'JagdalPur', 'Mysore', 'Leh']},
    {'id': 38, 'question': 'Which pet do you like to owe ?', 'options': ['Kutta', 'Billi', 'MagarMacccha', 'Ghadiyal']},
    {'id': 39, 'question': 'Where do you want to go ?', 'options': ['Goa', 'JagdalPur', 'Mysore', 'Leh']},
    {'id': 40, 'question': 'Which pet do you like to owe ?', 'options': ['Kutta', 'Billi', 'MagarMacccha', 'Ghadiyal']},
    {'id': 41, 'question': 'Where do you want to go ?', 'options': ['Goa', 'JagdalPur', 'Mysore', 'Leh']},
    {'id': 42, 'question': 'Which pet do you like to owe ?', 'options': ['Kutta', 'Billi', 'MagarMacccha', 'Ghadiyal']},
    {'id': 43, 'question': 'Where do you want to go ?', 'options': ['Goa', 'JagdalPur', 'Mysore', 'Leh']},
    {'id': 44, 'question': 'Which pet do you like to owe ?', 'options': ['Kutta', 'Billi', 'MagarMacccha', 'Ghadiyal']},
    ];
  actualUserData = {'responses': null};
  databaseurl = 'https://zingur-beff5.firebaseio.com/';
  shareUrl = null;
  tempResponder = {};
  constructor(private http: Http) { }
  getQuestions() {
    return this.defaultQuestions;
  }
  setQuestions(id: number) {
  }
  setUserDetail(userDetail: {'name': any, 'email': any, 'verified': boolean, 'thumb': string}) {
    this.actualUserData['name'] = userDetail.name;
    this.actualUserData['email'] = userDetail.email;
    this.actualUserData['thumb'] = userDetail.thumb;
    this.actualUserData['verified'] = userDetail.verified;
    console.log(this.actualUserData);
  }
  setResponderDetail(data) {
    this.tempResponder['name'] = data.name;
    this.tempResponder['email'] = data.email;
    this.tempResponder['thumb'] = data.thumb;
  }
  setRespondersResult(data, id) {
    this.tempResponder['answers'] = data;
    this.http.post(this.databaseurl + 'data/' + id + '/responses.json', this.tempResponder)
      .subscribe((resData: Response) => {
      console.log(resData);
      }, (error: Response) => {
      console.log(error);
      });
  }
  setQuiz(quiz) {
    return new Promise((resolve, reject) => {
      this.actualUserData['quiz'] = quiz;
      console.log(this.actualUserData);
      this.http.post('https://zingur-beff5.firebaseio.com/data.json', this.actualUserData)
        .subscribe((resData: Response) => {
        this.shareUrl = this.hostname + '/visitor/' + resData.json().name;
        resolve();
        console.log(resData);
        }, (error: Response) => {
        console.log(error);
        });
    });
  }
  getUserDataById(id: string) {
    return new Promise((resolve, reject) => {
      this.http.get(this.databaseurl + 'data/' + id + '.json')
        .subscribe((resData: Response) => {
          resolve(resData.json());
        });
    });
  }
}
