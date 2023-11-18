import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RegisterComponent } from './register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserService } from './user.service';
import { LoginComponent } from './login/login.component';
import { PlantravelComponent } from './plantravel/plantravel.component';
import { BusService } from './bus.service';
import { SeatsComponent } from './seats/seats.component';
import { PayComponent } from './pay/pay.component';
import { AuthGuard } from './auth.guard';
import { TokenInterceptorService } from './token-interceptor.service';
import { TicketconfirmComponent } from './ticketconfirm/ticketconfirm.component';
import { NgxPrintModule } from 'ngx-print';
import { SeatsGuard } from './seats.guard';
import { PayGuard } from './pay.guard';
import { WildcardComponent } from './wildcard/wildcard.component';
import { TicketGuard } from './ticket.guard';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DashboardComponent,
    NavbarComponent,
    RegisterComponent,
    LoginComponent,
    PlantravelComponent,
    SeatsComponent,
    PayComponent,
    TicketconfirmComponent,
    WildcardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxPrintModule
  ],
  providers: [ UserService, BusService, AuthGuard, SeatsGuard, PayGuard, TicketGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
