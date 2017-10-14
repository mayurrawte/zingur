import {NgModule} from '@angular/core';
import {RoundPipe} from '../round.pipe';
import {CommonModule} from '@angular/common';
import {ReplaceWithUserPipe} from '../replace-with-user.pipe';
import {RoundProgressModule} from 'angular-svg-round-progressbar';

@NgModule({
  declarations: [
    RoundPipe,
    ReplaceWithUserPipe,
  ],
  imports: [
    CommonModule,
    RoundProgressModule
  ],
  exports: [
    RoundPipe,
    ReplaceWithUserPipe,
    RoundProgressModule
  ]
})

export class SharedModule {}

