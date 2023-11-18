import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormArray, FormGroup, Validators, Form, FormBuilder, NgForm } from '@angular/forms';
import { BusService } from '../bus.service';

@Component({
  selector: 'app-seats',
  templateUrl: './seats.component.html',
  styleUrls: ['./seats.component.css']
})
export class SeatsComponent implements OnInit {
  from: any;
  to: any;
  travelDate: any;

  noBusDetails: boolean = false;
  totalFare: number = 0;
  selectedSeatNos: number[] = [];
  seatForm!: FormGroup ;
  showSeat: boolean = false;

  bus: any;
  fare!: number;
  data: any;
  sdetails: any;
  busdetails: any;
  totalAmount: any;

  info: any;
  selectedSeats: any;
  clickedSeats : any = [];
  bookedSeats: any;
  value: any;
  busInfo:any;
  busData: any;

layoutSeats: any[]=[]
  
  prebooked: any[]=[]
  public seatArray = this.layoutSeats

  get seatDetails() {
    return this.seatForm.get('seatDetails') as FormArray;
  }


  constructor(private router: Router, private formBuilder: FormBuilder, private busservice: BusService) {
    
    this.busservice.busdetails$.subscribe((info)=> {
      this.bus=info
      this.prebooked=info[0].bookedSeats
    })
   }

  ngOnInit(): void {

    for(let i=0;i<40;i++) 
    {
      if(this.prebooked.includes(i+1)) {
        this.layoutSeats.push({ value: i+1, clicked: false, booked: true})
      }
      else {
        this.layoutSeats.push({ value: i+1, clicked: false, booked: false})
      }
    }

    this.seatForm = this.formBuilder.group({
      seatDetails: this.formBuilder.array([]),
    })
    this.selectedSeatNos = [];
  }
   
  onSeatSelect(seatIndex: number, event: any) {

    if(this.seatArray[seatIndex-1].booked == true) {
      return;
    }
    this.seatArray[seatIndex - 1].clicked = !this.seatArray[seatIndex - 1].clicked;
    if (this.seatArray[seatIndex - 1].clicked) {
      this.selectedSeatNos.push(seatIndex);
      this.seatDetails.push(this.formBuilder.group({
        name: this.formBuilder.control('', [Validators.required, Validators.pattern("[a-zA-Z' ']+$")]),
        gender: this.formBuilder.control('', Validators.required),
        seatNo: this.formBuilder.control(seatIndex)
      }));
    } else {
      let control =<FormArray> this.seatForm.controls['seatDetails'];
      for(let i=0;i<=this.selectedSeatNos.length;i++) {
        if(control.value[i].seatNo == seatIndex) {
          control.removeAt(i);
          break;
        }
      }
      this.selectedSeatNos = this.selectedSeatNos.filter(val => { 
        return val !== seatIndex;
       })
    }
    if(this.selectedSeatNos.length > 0) {
      this.showSeat = true;
    } else{
      this.showSeat = false;
    }

    for(let details of this.bus){
      this.fare=details.fare;      
    }
    this.totalAmount= this.fare*this.selectedSeatNos.length + 150;
  }


  onConfirm() {
  }

  pay(){
      this.busservice.amountTot(this.totalAmount)
      this.router.navigate(['/pay'],{state: this.totalAmount});
      this.busservice.payment = true
      this.busservice.send(this.seatDetails.value);
  }

}
