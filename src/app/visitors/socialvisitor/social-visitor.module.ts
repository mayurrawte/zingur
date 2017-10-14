import {NgModule} from '@angular/core';
import {SocialvisitorComponent} from './socialvisitor.component';
import {RouterModule, Routes} from '@angular/router';
import {CommonModule} from '@angular/common';
import {SocialModule} from '../../shared/social.module';
const appRoute: Routes = [
  {path: '', component: SocialvisitorComponent}
];
@NgModule({
  declarations: [
    SocialvisitorComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(appRoute),
    SocialModule
  ]
})
export class SocialVisitorModule {}
