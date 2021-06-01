import { Component, OnInit } from '@angular/core';
import {SignUpForm} from "../../model/SignUpForm";
import {FormControl, Validators} from "@angular/forms";
import {AuthService} from "../../service/auth.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  emailFormControl = new FormControl('',[
      Validators.required,
      Validators.email
  ])
  hide = true;
  status = 'Please Register in the form!'
  form: any = {};
  signUpForm: SignUpForm;
  error1: any = {
    message: "nouser"
  }
  error2: any = {
    message: "noemail"
  }
  success: any = {
    message: "yes"
  }
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }
  ngSubmit(){
    this.signUpForm = new SignUpForm(
        this.form.name,
        this.form.username,
        this.form.email,
        this.form.password
    )
    this.authService.signUp(this.signUpForm).subscribe(data =>{
      console.log('data == ',data)
      if(JSON.stringify(data)==JSON.stringify(this.error1)){
        this.status = 'The name is existed! Please try again!'
      }
      if(JSON.stringify(data)==JSON.stringify(this.error2)){
        this.status = 'The email is existed! Please try again!'
      }
      if(JSON.stringify(data)==JSON.stringify(this.success)){
        this.status = 'Create account success ->'
      }
    })
  }
}
