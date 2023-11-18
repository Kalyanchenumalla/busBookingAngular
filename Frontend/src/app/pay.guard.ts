import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { BusService } from './bus.service';

@Injectable({
  providedIn: 'root'
})
export class PayGuard implements CanActivate {
  constructor(private busservice: BusService, private router: Router){}
  canActivate(): boolean {
    if(this.busservice.payment) {
      return true
    } else {
      this.router.navigate(['/seats'])
      return false
    }
  }
  
}
