import { Injectable } from '@angular/core';
import { busData } from './busdata';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { buses } from './nobuses';
@Injectable({
  providedIn: 'root'
})
export class BusService {
  
  
  explore: any 
  booked: any
  bookedSeats: any
private busDetails = new BehaviorSubject<any>(null);
busdetails$ = this.busDetails.asObservable();


private  seatDetails = new BehaviorSubject<any>(null);
sdetails$ = this.seatDetails.asObservable();
  selectedBus: any;
  totAmount: any;
  dataBus: any;
  bus: any

  constructor(private http: HttpClient) { }
  array=[];
  result: busData[] = [];

    noBusesFound(data: any) {
      return this.http.post<buses>('http://localhost:8080/buses/nobuses', data);
    }

    newBookedSeats(seats: any) {
      // console.log(seats)
      return this.http.put('http://localhost:8080/buses/bookedSeats', seats)
    }

    sendBusDetails(dataBus: any) {
     this.selectedBus = dataBus
      // console.log(this.selectedBus);
      
    }
    getBusDetails() {
      return this.selectedBus
      }

  send(sdetails: string){
    this.seatDetails.next(sdetails);
    // console.log(this.sdetails$);
    
  }

  sendbus(busdetails : string){
    this.busDetails.next(busdetails);
    // console.log(this.busdetails$);
  }


  getTotalSeats() {
    return this.busDetails
  }

  amountTot(num: any) {
    this.totAmount = num
    // console.log(this.totAmount);
  }

  getTotal() {
    return this.totAmount
  }

  seatsBooked(data: object) {
    return this.http.post("http://localhost:8080/buses/bookedSeats", data)
  }


  payment: boolean = false;
  seats: boolean= false;
  ticket: boolean= false;
}
