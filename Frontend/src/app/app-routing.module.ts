import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { PlantravelComponent } from './plantravel/plantravel.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SeatsComponent } from './seats/seats.component';
import { PayComponent } from './pay/pay.component';
import { AuthGuard } from './auth.guard';
import { TicketconfirmComponent } from './ticketconfirm/ticketconfirm.component';
import { SeatsGuard } from './seats.guard';
import { PayGuard } from './pay.guard';
import { WildcardComponent } from './wildcard/wildcard.component';
import { TicketGuard } from './ticket.guard';

const routes: Routes = [
  {path:'', redirectTo:'/home', pathMatch:'full'},
  {path:'register', component: RegisterComponent},
  {path:'login', component: LoginComponent},
  {path:'home', component: HomeComponent},
  {path:'navbar', component: NavbarComponent, canActivate:[AuthGuard]},
  {path:'plantravel', component: PlantravelComponent, canActivate: [AuthGuard]},
  {path:'seats', component: SeatsComponent, canActivate: [AuthGuard, SeatsGuard],},
  {path:'pay', component: PayComponent, canActivate: [AuthGuard, PayGuard]},
  {path:'ticketconfirm', component: TicketconfirmComponent, canActivate: [AuthGuard, TicketGuard]},
  {path:'**', component: WildcardComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
