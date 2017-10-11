import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {DataService} from './data.service';

@Injectable()
export class IsAllowedGuard implements CanActivate {
  constructor(private dataService: DataService) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.dataService.isAllowed;
  }
}
