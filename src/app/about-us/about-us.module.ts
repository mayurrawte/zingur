import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AboutUsComponent} from './about-us.component';
const appRoute: Routes = [
  {path: '', component: AboutUsComponent}
];
@NgModule({
  declarations: [
    AboutUsComponent
  ],
  imports: [
    RouterModule.forChild(appRoute)
  ]
})
export class AboutUsModule {}
