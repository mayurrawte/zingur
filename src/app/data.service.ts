import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import {AuthService} from 'angular2-social-login';
@Injectable()
export class DataService {
  hostname =  window.location.hostname;
  respondUser = null;
  requestUser = null;
  databaseurl = 'https://zingur-beff5.firebaseio.com/';
  shareUrl = null;
  resultUrl = null;
  isAllowed = false;
  public loading = true;
  sgheader = new Headers({'Authorization': 'Bearer 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', 'Content-Type' : 'application/json'});
  defaultQuestions = [{'id': 1, 'question': 'Who is your favorite actor ?', 'options': ['Akshay Kumar', 'Salmam Khan', 'Fawad Khan', 'Hritik Roshan'] }, {'id': 2, 'question': 'Which superhero do you like the most ?', 'options': ['Superman', 'Shaktimaan', 'IronMan', 'Deadpool'] }, {'id': 3, 'question': 'Favorite drink !', 'options': ['Tea', 'Beer', 'Coffee', 'Pomagranade Juice'] }, {'id': 4, 'question': 'Your preferred movie genre', 'options': ['Comedy', 'Sci-Fi', 'Action', 'Romantic'] }, {'id': 5, 'question': 'What would you like to do in spare time ?', 'options': ['Sleep', 'Music', 'Dream', 'Cook'] }, {'id': 6, 'question': 'Which super power would you like to have ?', 'options': ['Immortality', 'Mind control', 'Invisibility', 'Time Travel'] }, {'id': 7, 'question': 'Your favorite food is ?', 'options': ['Dosa', 'Paav Bhaji', 'Noodles', 'Pizza'] }, {'id': 8, 'question': 'A perfect date for you ?', 'options': ['Someone Alike', 'Smart', 'Beautiful', 'Cute'] }, {'id': 9, 'question': 'Place you would like to visit ?', 'options': ['Italy', 'Silicon Valley', 'Switzerland', 'Jammu Kashmir'] }, {'id': 10, 'question': 'What do you do on a weekends ?', 'options': ['Movie', 'Stay at home', 'Hangout with Friends', 'Work'] }, {'id': 11, 'question': 'Which pet do you like to owe ?', 'options': ['Dog', 'Cat', 'Rabbit', 'Mouse'] }, {'id': 12, 'question': 'Favorite TV series ?', 'options': ['Friends', 'I don\'t watch', 'Scorpians', 'Two and a Half Man'] }, {'id': 13, 'question': 'Your dream is to ?', 'options': ['Own a big car', 'Perfect Partner', 'Go to himalayan', 'World tour'] }, {'id': 14, 'question': 'Who is your biggest crush?', 'options': ['Hritik Roshan', 'Deepika Padukon', 'Shirley Setia', 'Fawad Khan'] }, {'id': 15, 'question': 'Whom do you like to meet ?', 'options': ['Ramdev Baba', 'Narendra Modi', 'Elon Musk', 'Donald Trump'] } ];
  constructor(private http: Http, private authService: AuthService) {
    document.onreadystatechange = ( () => {
      if (document.readyState === 'complete') {
        this.loading = false;
      }
    });
    if (localStorage.getItem('kindaData')) {
      const kindaData = JSON.parse(localStorage.getItem('kindaData'));
      this.shareUrl = kindaData.shareurl;
      this.resultUrl = kindaData.resulturl;
      this.requestUser = kindaData.user;
    }

  }
  getQuestions() {
    return this.defaultQuestions.slice();
  }
  setRespondersResult(data, id) {
    this.respondUser['detail'] = data;
    console.log(this.respondUser);
    this.http.post(this.databaseurl + 'data/' + id + '/responses.json', this.respondUser)
      .subscribe((resData: Response) => {
      console.log(resData);
      }, (error: Response) => {
      console.log(error);
      });
  }
  setQuiz(quiz) {
    return new Promise((resolve, reject) => {
      this.requestUser['quiz'] = quiz;
      console.log(this.requestUser);
      this.http.post('https://zingur-beff5.firebaseio.com/data.json', this.requestUser)
        .subscribe((resData: Response) => {
        this.shareUrl = this.hostname + '/visitor/' + resData.json().name;
        localStorage.setItem('reverseId', (resData.json().name).split('').reverse().join(''));
        this.resultUrl = this.hostname + '/result/' + (resData.json().name).split('').reverse().join('');
          this.sendResultUrlToMail(this.requestUser.name, this.requestUser.email, this.resultUrl)
        const kindaData = {'shareurl': this.shareUrl, 'resulturl': this.resultUrl, 'user': this.requestUser};
        localStorage.setItem('kindaData', JSON.stringify(kindaData));
        // this.sendResultUrlToMail(this.requestUser.email, this.resultUrl);
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
  localLogin(localUserData: {email: string, name: string} , usertype: string) {
    if (usertype === 'responder') {
      this.respondUser = {
        'name': localUserData.name,
        'email': localUserData.email,
        'verified': false,
        'thumb': 'default'
      }
    } else {
      this.requestUser = {
        'name': localUserData.name,
        'email': localUserData.email,
        'thumb': 'default',
        'verified': false
      }
    }
    this.isAllowed = true;
  }
  sendResultUrlToMail(name, email, resulturl) {
    const sendData = {'name': name, 'to': email, 'resulturl': resulturl};
    this.http.post('https://some-one.me/zingur/sendresult', sendData)
    .subscribe((data: Response) => {
      console.log(data);
      alert('Result Sent to your mail !');
    });
  }
  socialLogin(provider: string, usertype: string) {
    return new Promise((resolve, reject) => {
      this.authService.login(provider)
        .subscribe((user) => {
        console.log(user);
        if (usertype === 'responder') {
          this.respondUser = {
            'name': user['name'],
            'email': user['email'],
            'thumb': user['image'],
            'verified': true
          }
        } else {
          this.requestUser = {
            'name': user['name'],
            'email': user['email'],
            'thumb': user['image'],
            'verified': true
          }
        }
        this.isAllowed = true;
        resolve();
      }, (error) => {
        reject();
        this.loading = false;
        console.log(error);
      });
    });
  }
  contactUsEmail(name, email, message) {
    const contactData = {from: email, name: name, messsage: message};
    this.http.post(this.databaseurl + 'contact.json', contactData)
    .subscribe((resData: Response) => {
      alert('You will be hearing from us shortly');
    });
  }
}
