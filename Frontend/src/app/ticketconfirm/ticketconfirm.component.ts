import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BusService } from '../bus.service';

@Component({
  selector: 'app-ticketconfirm',
  templateUrl: './ticketconfirm.component.html',
  styleUrls: ['./ticketconfirm.component.css']
})
export class TicketconfirmComponent implements OnInit {

  bookingid: any = Math.trunc(Math.random()*1000000000)+1;

  sdetails$: any;
  busdetails: any;
  sdetails: any

totalAmount: any;
  data: any;
  name: any;
  from: any
  to: any;
  travelDate: any



  constructor(private router: Router, private busService: BusService) { 
    this.totalAmount = this.router.getCurrentNavigation()?.extras.state;
  }

  ngOnInit(): void {
    this.busService.sdetails$.subscribe(data=> {
      this.sdetails = data
      
    })
    this.busService.busdetails$.subscribe(data=> {
      this.busdetails = data;
      
    })
  }
}
