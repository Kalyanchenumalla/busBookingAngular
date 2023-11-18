import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private injector: Injector) { }

  intercept(req: any , next: any) {
    let userService = this.injector.get(UserService)
    if(userService.getToken() != null) {
    let tokenizedReq = req.clone(
      {
      setHeaders: {Authorization :userService.getToken()}
      }
    )
    return next.handle(tokenizedReq)
  } else {
    return next.handle(req)
    }
  }
}
