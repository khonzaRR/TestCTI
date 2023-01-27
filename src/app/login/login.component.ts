import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as dataUser from '../../assets/data.json';
import { AuthService } from '../service/auth.service';
import {Router} from '@angular/router';
import { timer } from 'rxjs';
import { faUserCircle} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{


  usersData : any[] = [];

  userLogin ={
    email : '',
    password : '',
    rememberMe : false
  }
  isNotValidEmail : boolean = false;
  isEmailEmpty : boolean = false;
  isNotValidPass : boolean = false;
  isPassEmpty : boolean = false;
  usersDataJson = dataUser;
  wrongPassword : boolean = false;
  isLoading : boolean = false;
  faUserCircle = faUserCircle;


  constructor(private auth : AuthService, private router : Router){
    
  }
  
  ngOnInit(): void {
    // this.usersData.push(this.usersDataJson.results);
    this.usersData = this.usersDataJson.results;
    this.isNotValidEmail = false;
    this.isEmailEmpty = false;
    this.isNotValidPass= false;
    this.isPassEmpty= false;
    this.isLoading = false;
    // this.emailValidation(this.userLogin.email);
    // this.passwordValidation(this.userLogin.password);
    
    // this.loginApp();
    
      
  }

  validationEmailAndPassword(loginForm : NgForm) {
    let email = loginForm.form.value.email;
    let password = loginForm.form.value.password;
    if(email.indexOf('@') == -1 ){
      this.isNotValidEmail = true;
      this.isLoading = false;
      loginForm.form.reset();
    }else{
      this.isNotValidEmail = false;
    }
    if(password.length < 6){
      this.isNotValidPass = true;
      this.isLoading = false;
      loginForm.form.reset();
    }else{
      this.isNotValidPass = false;
    }
  }

  loginApp(loginForm: NgForm){
    // debugger
    this.isLoading = true;

    this.wrongPassword = false;

    if(!loginForm.form.valid){
      return ;
    }
 
    if(loginForm.form.valid){
      this.validationEmailAndPassword(loginForm);
      
      
    }
    
    const isUserExist = this.usersData.find(
      data =>
        data.email == loginForm.form.value.email
        && 
        data.login.password == loginForm.form.value.password
    );

    if(isUserExist != undefined){
      this.auth.login(isUserExist, loginForm.form.value.rememberMe).then(() =>{
        timer(10000).subscribe(() =>{
          this.router.navigate(['/home']);
          // this.isLoading = false;
        })
      })
    }
    else{
      this.wrongPassword = true;
      this.isLoading = false;
    }
    
  }
}
