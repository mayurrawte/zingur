import {NgModule} from '@angular/core';
import {RoundPipe} from '../round.pipe';
import {CommonModule} from '@angular/common';
import {ReplaceWithUserPipe} from '../replace-with-user.pipe';

@NgModule({
  declarations: [
    RoundPipe,
    ReplaceWithUserPipe,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    RoundPipe,
    ReplaceWithUserPipe
  ]
})

export class SharedModule {
}

