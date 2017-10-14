import {NgModule} from '@angular/core';
import {Angular2SocialLoginModule} from 'angular2-social-login';
const providers = {
  'google': {
    'clientId': '802102612483-g4s10i9ccsfqj9nsvf1ceqf2fsufven2.apps.googleusercontent.com'
  },
  'facebook': {
    'clientId': '347398449039184',
    'apiVersion': 'v2.10'
  }
};
@NgModule({
  imports: [
    Angular2SocialLoginModule
  ]
})
export class SocialModule {
}
Angular2SocialLoginModule.loadProvidersScripts(providers);
