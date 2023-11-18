import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  data: any
  showMsg: boolean = false;
  showNotFound: boolean = false;
  showWrongPassword: boolean = false;
  value: any
  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) { }
  form!: FormGroup

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null,[Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      password:new FormControl(null,[Validators.required,Validators.minLength(6)]),
    })
  }

  getControls(){
    return this.form.controls;
    }

  onLoginSubmit(value: any){
    this.userService.login(value).subscribe(info => {
      this.data = info
      
      if (this.data.success) {
        localStorage.setItem('token', this.data.token)
        setTimeout(()=>this.router.navigate(['/plantravel']),2000);
        this.showMsg = true;
      }else if (this.data.msg) {
        this.showNotFound = true;
        setTimeout(() => {
          this.showNotFound = false;
        }, 2000);
      } else if(this.data.message) {
        this.showWrongPassword = true;
      } 
    }
    )
  }

}


