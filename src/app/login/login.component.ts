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

  // formLogin : FormGroup;
  // isFieldInvalid = isFieldInvalid;
  usersData : any[] = [];
  // objSignUp : any ={
  //   email : '',
  //   password : ''
  // };
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
  // faMailBulk = faMailBulk
  // password : string;

  constructor(private auth : AuthService, private router : Router){
    // console.log(dataUser);
    
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
      loginForm.form.reset();
    }else{
      this.isNotValidEmail = false;
    }
    if(password.length < 6){
      this.isNotValidPass = true;
      loginForm.form.reset();
    }else{
      this.isNotValidPass = false;
    }
  }

  loginApp(loginForm: NgForm){
    // debugger
    this.isLoading = true;
    // this.formLogin.markAllAsTouched();
    this.wrongPassword = false;
    console.log(loginForm);
    if(!loginForm.form.valid){
      return ;
    }
    
    if(loginForm.form.valid){
      this.validationEmailAndPassword(loginForm);
      // this.emailValidation(this.userLogin.email);
      // this.passwordValidation(this.userLogin.password);
      // console.log(email);
    }
    console.log(loginForm.form.value.email);
    console.log(loginForm.form.value.password);
    console.log(this.usersData);
    const isUserExist = this.usersData.find(
      data =>
        data.email == loginForm.form.value.email
        && 
        data.login.password == loginForm.form.value.password
    );
    console.log(isUserExist);
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
    
    // console.log(isUserExist);
  }

  // loginUser(): void{
  //   this.auth.login().then(() =>{
  //     this.router.navigate(['/']);
  //   })
  // }
}
