import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { BusService } from './bus.service';

@Injectable({
  providedIn: 'root'
})
export class SeatsGuard implements CanActivate {
  constructor(private bus: BusService, private router: Router){}
  canActivate(): boolean {
    if(this.bus.seats) {
      return true
    } else {
      this.router.navigate(['/plantravel'])
      return false
    }
  }
  
}
