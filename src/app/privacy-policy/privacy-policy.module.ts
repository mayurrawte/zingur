import {NgModule} from '@angular/core';
import {PrivacyPolicyComponent} from './privacy-policy.component';
import {RouterModule, Routes} from '@angular/router';
import {CommonModule} from '@angular/common';

const appRoutes: Routes = [
  {path: '', component: PrivacyPolicyComponent}
];
@NgModule({
  declarations: [
    PrivacyPolicyComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(appRoutes)
  ]
})
export class PrivacyPolicyModule {}
