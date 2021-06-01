import { Component, OnInit } from '@angular/core';
import {SignInForm} from "../../model/SignInForm";
import {AuthService} from "../../service/auth.service";
import {TokenService} from "../../service/token.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: any = {};
  signInForm: SignInForm;
  hide = true
  isLoginFailed = false;
  status = '';
  constructor(private authService: AuthService,
              private tokenService: TokenService,
              private router: Router) { }

  ngOnInit(): void {
  }
  ngSubmit(){
    this.signInForm = new SignInForm(
        this.form.username,
        this.form.password
    )
    this.authService.signIn(this.signInForm).subscribe(data =>{
      if(data.token != undefined){
        this.tokenService.setNameKey(data.name);
        this.tokenService.setTokenKey(data.token);
        this.tokenService.setRoleKey(data.roles);
        this.router.navigate(['user-account']).then(()=>{
          window.location.reload();
        });
        // window.location.reload();
      } else {
        this.isLoginFailed = true;
        this.status = 'Login Failed! Please check your username or password!'
      }

    })
  }
}
