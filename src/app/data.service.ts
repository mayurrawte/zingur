import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';

@Injectable()
export class DataService {
  hostname =  window.location.hostname;
  defaultQuestions = [
    {'id': 1, 'question': 'Which pet do you like to owe ?', 'options': ['Cat', 'Dog', 'Zebra', 'rabbit']},
    {'id': 2, 'question': 'Which superhero do you like the most ?', 'options': ['Superman', 'Shaktimaan', 'IronMan', 'Deadpool']},
    {'id': 3, 'question': 'Chocolate that melts your heart !', 'options': ['Parle', 'perk', 'Cadbery', 'Melody']},
    {'id': 4, 'question': 'Your preferred movie genre', 'options': ['Comedy', 'Sci-Fi', 'Action', 'Adventure']},
    {'id': 5, 'question': 'What would you like to do in spare time ?', 'options': ['Sleep', 'Music', 'Dream', 'Cook']},
    {'id': 6, 'question': 'Which super power would you like to have ?', 'options': ['Fly', 'Super beam', 'Destroy Everything', 'Go to future']},
    {'id': 7, 'question': 'Your favorite food is ? ?', 'options': ['Dosa', 'Paav Bhaji', 'Noodles', 'Pizza']},
    {'id': 8, 'question': 'A perfect date for you ?', 'options': ['With Same Interest', 'Smart', 'Beautiful', 'Dumb']},
    {'id': 9, 'question': 'Place you would like to visit ?', 'options': ['Estonia', 'Silicon Valley', 'Himalaya', 'Jammu']},
    {'id': 10, 'question': 'What do you do on a weekends ?', 'options': ['Movie', 'Stay at home and Chill', 'Hangout with Friends', 'Nothing']},
    {'id': 11, 'question': 'Which pet do you like to owe ?', 'options': ['Kutta', 'Billi', 'MagarMacccha', 'Ghadiyal']},
    {'id': 12, 'question': 'Where do you want to go ?', 'options': ['Goa', 'JagdalPur', 'Mysore', 'Leh']},
    {'id': 13, 'question': 'Which pet do you like to owe ?', 'options': ['Kutta', 'Billi', 'MagarMacccha', 'Ghadiyal']},
    {'id': 14, 'question': 'Where do you want to go ?', 'options': ['Goa', 'JagdalPur', 'Mysore', 'Leh']},
    {'id': 15, 'question': 'Which pet do you like to owe ?', 'options': ['Kutta', 'Billi', 'MagarMacccha', 'Ghadiyal']},
    ];
  actualUserData = {'responses': null};
  databaseurl = 'https://zingur-beff5.firebaseio.com/';
  shareUrl = null;
  resultUrl = null;
  tempResponder = {};
  constructor(private http: Http) { }
  getQuestions() {
    return this.defaultQuestions;
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
    this.tempResponder['detail'] = data;
    console.log(this.tempResponder);
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
        this.resultUrl = this.hostname + '/result/' + (resData.json().name).split('').reverse().join('');
        resolve(resData.json().name);
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
