import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { BusService } from './bus.service';

@Injectable({
  providedIn: 'root'
})
export class TicketGuard implements CanActivate {
  constructor(private busservice: BusService, private router: Router) {}
  canActivate(): boolean {
    if(this.busservice.ticket) {
      return true
    } else {
      this.router.navigate(['/pay'])
      return false
    }
  }
  
}
