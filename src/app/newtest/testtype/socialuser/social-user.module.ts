import {NgModule} from '@angular/core';
import {SocialuserComponent} from './socialuser.component';
import {SocialModule} from '../../../shared/social.module';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';

const appRoutes: Routes = [
  {path: '', component: SocialuserComponent}
];
@NgModule({
  declarations: [
    SocialuserComponent
  ],
  imports: [
    CommonModule,
    SocialModule,
    RouterModule.forChild(appRoutes),
  ]
})
export class SocialUserModule {
}
