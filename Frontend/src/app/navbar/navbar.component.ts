import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BusService } from '../bus.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  buses: any;
  buses1: any;
  pay: any;
  ticket2: any

  constructor(private router: Router, private userService: UserService, private busservice: BusService) { }

  ngOnInit(): void {
    this.buses = this.busservice.getBusDetails()


    this.buses1= this.busservice.getTotal()

    this.pay=this.busservice.ticket

    
  }
 
  logout() {
      this.router.navigate(['/login'])
      window.location.reload();
      localStorage.clear();
  }
}
