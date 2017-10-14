import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { RouterModule, Routes } from '@angular/router';
import { NewtestComponent } from './newtest/newtest.component';
import { QuizComponent } from './newtest/quiz/quiz.component';
import { TesttypeComponent } from './newtest/testtype/testtype.component';
import { DataService } from './data.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShareComponent } from './newtest/share/share.component';
import { HttpModule} from '@angular/http';
import { Page404Component } from './page404/page404.component';
import { IsAllowedGuard } from './is-allowed.guard';
import { FooterComponent } from './footer/footer.component';
import { LoaderComponent } from './loader/loader.component';
import { LocaluserComponent } from './newtest/testtype/localuser/localuser.component';
import { AuthService } from 'angular2-social-login';
import {SharedModule} from './shared/shared.module';
import {VisitorsService} from "./visitors.service";
const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'new-test', component: NewtestComponent, children: [
    {path: '', component: TesttypeComponent, children: [
      {path: 'local', component: LocaluserComponent},
      {path: 'social', loadChildren: './newtest/testtype/socialuser/social-user.module#SocialUserModule'}
    ]},
    {path: 'quiz', component: QuizComponent, canActivate: [IsAllowedGuard]},
    {path: 'share', component: ShareComponent},
    {path: '**', component: Page404Component}
  ]},
  {path: 'visitor/:quizid', loadChildren: './visitors/visitors.module#VisitorsModule'},
  {path: 'result/:resultid', loadChildren: './results/result.module#ResultModule'},
  {path: 'privacy-policy', loadChildren: './privacy-policy/privacy-policy.module#PrivacyPolicyModule'},
  {path: 'about-us', loadChildren: './about-us/about-us.module#AboutUsModule'},
  {path: 'contact-us', loadChildren: './contact-us/contact-us.module#ContactUsModule'}
];


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    NewtestComponent,
    QuizComponent,
    TesttypeComponent,
    ShareComponent,
    Page404Component,
    FooterComponent,
    LoaderComponent,
    LocaluserComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    SharedModule
  ],
  providers: [DataService, IsAllowedGuard, AuthService, VisitorsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
