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
  defaultQuestions = [{'id': 1, 'question': 'Who is your favorite actor ?', 'options': ['Akshay Kumar', 'Salmam Khan', 'Shakti Kapoor', 'Raakpal Yadav'] }, {'id': 2, 'question': 'Which superhero do you like the most ?', 'options': ['Superman', 'Shaktimaan', 'IronMan', 'Deadpool'] }, {'id': 3, 'question': 'Chocolate that melts your heart !', 'options': ['Parle Kisme', 'PERK', 'Cadbury', 'Bournville'] }, {'id': 4, 'question': 'Your preferred movie genre', 'options': ['Comedy', 'Sci-Fi', 'Action', 'Adventure'] }, {'id': 5, 'question': 'What would you like to do in spare time ?', 'options': ['Sleep', 'Music', 'Dream', 'Cook'] }, {'id': 6, 'question': 'Which super power would you like to have ?', 'options': ['Fly', 'Super beam', 'Destroy Everything', 'Go to future'] }, {'id': 7, 'question': 'Your favorite food is ?', 'options': ['Dosa', 'Paav Bhaji', 'Noodles', 'Pizza'] }, {'id': 8, 'question': 'A perfect date for you ?', 'options': ['Someone Alike', 'Smart', 'Beautiful', 'Cute'] }, {'id': 9, 'question': 'Place you would like to visit ?', 'options': ['Estonia', 'Silicon Valley', 'Himalaya', 'Jammu'] }, {'id': 10, 'question': 'What do you do on a weekends ?', 'options': ['Movie', 'Stay at home and Chill', 'Hangout with Friends', 'Nothing'] }, {'id': 11, 'question': 'Which pet do you like to owe ?', 'options': ['Rattle snake', 'Cat', 'Rabbit', 'None'] }, {'id': 12, 'question': 'Favorite TV series ?', 'options': ['Friends', 'I don\'t watch', 'Scorpians', 'Two and a Half Man'] }, {'id': 13, 'question': 'Your dream is to ?', 'options': ['Own a big car', 'Have a villa', 'Go to himalayan', 'World tour'] }, {'id': 14, 'question': 'Who is your biggest crush?', 'options': ['Katrina Kaif', 'Deepika Padukon', 'Shirley Setia', 'Sunidhi Chouhan'] }, {'id': 15, 'question': 'Whom do you like to meet ?', 'options': ['Larry Page', 'Narendra Modi', 'Elon Musk', 'Mark Zuckerberg'] } ];
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
        this.resultUrl = this.hostname + '/result/' + (resData.json().name).split('').reverse().join('');
        const kindaData = {'shareurl': this.shareUrl, 'resulturl': this.resultUrl, 'user': this.requestUser};
        localStorage.setItem('kindaData', JSON.stringify(kindaData));
        this.sendResultUrlToMail(this.requestUser.email, this.resultUrl);
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
  sendResultUrlToMail(email, resulturl) {
    const data = {'personalizations': [{'to': [{'email': email}]}], 'from': {'email': 'no-reply@zingur.me'}, 'subject': 'Zingur Challenge', 'content': [{'type': 'text/plain', 'value': 'Heya! \n Your quiz has been generated successfully! You can view your result by clicking this link ' + resulturl}]};
    this.http.post('https://api.sendgrid.com/v3/mail/send', data, {headers: this.sgheader})
      .subscribe((emailResData: Response) => {
      console.log(emailResData.json());
      alert('Your result link has been sent to mail');
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
    const data = {'personalizations': [{'to': [{'email': 'm.r.rawte7@gmail.com'}]}], 'from': {'email': 'contactus@zingur.me'}, 'subject': name + ' want to contact from zingur', 'content': [{'type': 'text/plain', 'value': 'Heya! \n Name : ' + name + '\n Email: ' + email + '\n Message : ' + message}]};
    this.http.post('https://api.sendgrid.com/v3/mail/send', data, {headers: this.sgheader})
      .subscribe((emailResData: Response) => {
        console.log(emailResData.json());
        alert('We are glad to receive your message. We will be connecting to you shortly');
      }, (error: Response) => {
      console.log(error);
      });
  }
}
