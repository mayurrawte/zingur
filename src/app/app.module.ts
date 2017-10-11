import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RoundProgressModule} from 'angular-svg-round-progressbar';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import {RouterModule, Routes} from '@angular/router';
import { NewtestComponent } from './newtest/newtest.component';
import { QuizComponent } from './newtest/quiz/quiz.component';
import { TesttypeComponent } from './newtest/testtype/testtype.component';
import {DataService} from './data.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ShareComponent } from './newtest/share/share.component';
import {HttpModule} from '@angular/http';
import { VisitorsComponent } from './visitors/visitors.component';
import { ResultsComponent } from './results/results.component';
import { RoundPipe } from './round.pipe';
import { ReplaceWithUserPipe } from './replace-with-user.pipe';
import { Page404Component } from './page404/page404.component';
import {IsAllowedGuard} from './is-allowed.guard';
import {Angular2SocialLoginModule, AuthService} from 'angular2-social-login';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { FooterComponent } from './footer/footer.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { LoaderComponent } from './loader/loader.component';


const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'new-test', component: NewtestComponent, children: [
    {path: '', component: TesttypeComponent},
    {path: 'quiz', component: QuizComponent, canActivate: [IsAllowedGuard]},
    {path: 'share', component: ShareComponent},
    {path: '**', component: Page404Component}
  ]},
  {path: 'visitor/:quizid', component: VisitorsComponent},
  {path: 'result/:resultid', component: ResultsComponent},
  {path: 'privacy-policy', component: PrivacyPolicyComponent},
  {path: 'about-us', component: AboutUsComponent},
  {path: 'contact-us', component: ContactUsComponent}
];
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
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    NewtestComponent,
    QuizComponent,
    TesttypeComponent,
    ShareComponent,
    VisitorsComponent,
    ResultsComponent,
    RoundPipe,
    ReplaceWithUserPipe,
    Page404Component,
    PrivacyPolicyComponent,
    AboutUsComponent,
    FooterComponent,
    ContactUsComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    Angular2SocialLoginModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RoundProgressModule
  ],
  providers: [DataService, IsAllowedGuard, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
Angular2SocialLoginModule.loadProvidersScripts(providers);
