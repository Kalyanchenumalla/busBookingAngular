import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { BusService } from '../bus.service';
@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.css']
})
export class PayComponent implements OnInit {

seatDetails: any;
buses: any;
  totalAmount: any;
  seats= [];
  array: any[]=[]
  array1: any[]=[]
  object: any = {}
  id: any
  message:boolean = false


  constructor(private router:Router, private busservice: BusService) { 
    this.busservice.busdetails$.subscribe((result)=> {
      this.id=result[0]._id
    })
    this.busservice.sdetails$.subscribe((result)=> {
      this.array = result
    })
  }

  ngOnInit(): void {
    this.totalAmount = this.busservice.getTotal()
    
    
  }

  transaction: any = Math.trunc(Math.random()*1000000000000)+1;


  onSubmit(pay:NgForm){
    if(pay.valid) {
      return;
    }
  }
  viewticket(){
    this.busservice.amountTot(this.totalAmount)
    


    this.busservice.ticket= true

    for(let i=0;i<this.array.length; i++) {
      this.array1.push(this.array[i].seatNo);
    }
    this.object.id = this.id
    this.object.seats = this.array1
    this.busservice.seatsBooked(this.object).subscribe((result)=> {

    })
    this.router.navigate(['/ticketconfirm'],{state:this.totalAmount});
    
    
  
  }
}
