import {NgModule} from '@angular/core';
import {VisitorsComponent} from './visitors.component';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../shared/shared.module';
import {ReactiveFormsModule} from '@angular/forms';
import { LocalvisitorComponent } from './localvisitor/localvisitor.component';
import { QuizvisitorComponent } from './quizvisitor/quizvisitor.component';

const appRoute: Routes = [
  {path: '', component: VisitorsComponent, children: [
    {path: 'social', loadChildren: './socialvisitor/social-visitor.module#SocialVisitorModule'},
    {path: 'local', component: LocalvisitorComponent},
    {path: 'quiz', component: QuizvisitorComponent}
  ]}
];
@NgModule({
  declarations: [
    VisitorsComponent,
    LocalvisitorComponent,
    QuizvisitorComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(appRoute),
    SharedModule,
    ReactiveFormsModule
  ]
})

export class VisitorsModule {}
