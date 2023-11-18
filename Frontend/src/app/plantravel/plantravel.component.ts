import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { BusService } from '../bus.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-plantravel',
  templateUrl: './plantravel.component.html',
  styleUrls: ['./plantravel.component.css']
})
export class PlantravelComponent implements OnInit {
  Place: [] = [];
  explore: any;
  busType: any;
  arrival: any;
  departure: any;
  showMsg: boolean= false
  fare: any;
  Array: any;
  success:boolean = false
  form!: FormGroup
  Bus: any;
  res: any;
  getBus: any;

  constructor(private fb: FormBuilder, private busservice: BusService, private router: Router) {  }
  
  display: boolean = false
  error: any;
  expanded= false;
  selectDisabled = false;
  gotofrom = false;
  from!: string
  to!:string
  travelDate!: string


  ngOnInit(): void {
    this.getDate();
    this.getBus = this.busservice.getBusDetails()
    if(this.getBus!=null){
      this.form = new FormGroup({

        from: new FormControl(this.getBus[0].from, Validators.required),
        to: new FormControl(this.getBus[0].to, Validators.required),
        travelDate: new FormControl(this.getBus[0].travelDate, Validators.required)
      });
    //  console.log(this.getBus[0].from)
     this.submit(this.Bus)
    } else {
      this.form = new FormGroup({

        from: new FormControl('', Validators.required),
        to: new FormControl('', Validators.required),
        travelDate: new FormControl('', Validators.required)
     });
    }
  }


  getControls(){
    return this.form.controls;
    }

    
  model: any={};
  results: any=[];
  item: any=[];
  data: any;
  minDate: any='';

  getDate() {
    var date:any = new Date();
    var toDate: any = date.getDate();
    if(toDate < 10) { 
      toDate ='0'+ toDate;
    }
    var month: any = date.getMonth() + 1;
    if(month < 10) {
      month = '0' + month;
    }
    var year = date.getFullYear();
    this.minDate = year + "-" + month + "-" + toDate;
  }
  
  enaForm() {
    this.form.enable();
  }
  disableForm() {
    // this.form.disable();
  }
  clearForm() {
    this.display = false
    this.form.enable();
  }

  submit(Bus: any){
    this.from = this.form.value.from
    this.to = this.form.value.to
    this.travelDate = this.form.value.travelDate
    this.busservice.noBusesFound({

      from:this.from,to:this.to,travelDate:this.travelDate,

      busType:this.busType, arrival:this.arrival,departure:this.departure,

      fare:this.fare

    }).subscribe(res =>{

      this.data = res

     this.Array = this.data
     this.display = true
     if(res.message){
       this.error = res.message;
       this.Array = []
     } else {
       this.error=null
     }if(!res) {
       if(this.data instanceof HttpErrorResponse) {
         if(this.data.status === 401)
         this.router.navigate(['/login']);
       }
     }
    }) 
  }
    viewSeats(){
      this.busservice.seats=true
      this.busservice.sendBusDetails(this.data)
      this.router.navigate(['/seats'],{state:this.data});
      this.busservice.sendbus(this.data);
    }
}
