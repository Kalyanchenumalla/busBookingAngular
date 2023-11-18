import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl, FormBuilder } from "@angular/forms";
import { Router } from '@angular/router';
import { UserService } from '../user.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  showMsg: boolean = false;
  showEmailExists: boolean = false;
  data: any;
  value: any;
  constructor(private fb: FormBuilder, private userService: UserService, private router: Router ) { }
  form!: FormGroup
  dob!: Date;
  error!: String

  ngOnInit(): void {
    this.form=new FormGroup({
      username:new FormControl(null,[Validators.required,Validators.minLength(4),Validators.maxLength(30),Validators.pattern("^(?! )[A-Za-z ]*(?<! )$")]),
      email: new FormControl(null,[Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      mobileNumber:new FormControl(null,[Validators.required,Validators.minLength(10),Validators.maxLength(10),Validators.pattern("^(?!0)[0-9]{10}$")]),
      password:new FormControl(null,[Validators.required,Validators.minLength(8),Validators.maxLength(30), Validators.pattern("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}")]),
      birthDate:new FormControl(null, [Validators.required, Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)]),
      gender:new FormControl(null,[Validators.required]),

  })

  this.getDate();
  }

  maxDate : any = '';
  getDate() {
    var date: any = new Date();
    var toDate: any = date.getDate();
    if(toDate < 10) {
      toDate = '0'+toDate;
    }
    var month: any = date.getMonth() + 1;
    if(month < 10) {
      month = '0' + month;
    }
    var year = date.getFullYear();
    this.maxDate = year + "-" + month + "-" + toDate;
  }



  getControls(){
  return this.form.controls;
  }

  onSubmit(value: any) {
    this.userService.register(value)
    .subscribe(
      info=> {
      this.data = info
        if(this.data.success){
        setTimeout(()=>{this.router.navigate(['/login'])},2000);
        this.showMsg = true;
        } else if(this.data.msg){
          this.showEmailExists = true;
          setTimeout(() => {
            this.showEmailExists = false;
          }, 2000); 
        }
      }
    )
  }
}