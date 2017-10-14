import {NgModule} from '@angular/core';
import {ResultsComponent} from './results.component';
import {RouterModule, Routes} from '@angular/router';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../shared/shared.module';

const appRoutes: Routes = [
  {path: '', component: ResultsComponent}
];
@NgModule({
  declarations: [
    ResultsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(appRoutes),
    SharedModule
  ]
})

export class ResultModule {}
