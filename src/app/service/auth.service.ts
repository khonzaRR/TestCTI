import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userLogin : any ;

  constructor(private router : Router) { }

  login(data : any, rememberMe : boolean): Promise<any> {

    this.userLogin = data;

    return new Promise((resolve) =>{
      if(rememberMe == true){
        const item = {
          value : {
            id : this.userLogin.login.uuid,
            username : this.userLogin.id.name
          }
        }
        sessionStorage.setItem('userLogin', JSON.stringify(item))
        localStorage.setItem('userLogin', JSON.stringify(item));
        
      } else {
        const now = new Date();
        const item = {
          value : {
            id : this.userLogin.login.uuid,
            username : this.userLogin.id.name
          },
          expiry : now.getTime() + 60*60*1000 //one hour
        }
        sessionStorage.setItem('userLogin', JSON.stringify(item));
        localStorage.setItem('userLogin', JSON.stringify(item));
      }
      resolve(true);
    })
  }

  isLoggedIn(): boolean{
    const itemStr = localStorage.getItem('userLogin');
    if(!itemStr){
      return false;
    }

    const item = JSON.parse(itemStr);

    if(!item.expiry){


      return !!(localStorage.getItem('userLogin') && sessionStorage.getItem('userLogin'));
    }else{

      const now = new Date();
      if(now.getTime() > item.expiry){
        sessionStorage.removeItem('userLogin')
        localStorage.removeItem('userLogin');
        sessionStorage.clear();
        localStorage.clear();
        // this.router.navigate(['/login']);
        alert('Network Timeout');
        return false;
      }else{
        return !!(localStorage.getItem('userLogin') && sessionStorage.getItem('userLogin'));
      }
    }
    // return !!localStorage.getItem('userLogin');
  }


  logoutUser() : Promise<any> {

    return new Promise((resolve) =>{
      sessionStorage.getItem('userLogin');
      localStorage.getItem('userLogin');
      sessionStorage.removeItem('userLogin')
      localStorage.removeItem('userLogin');
      sessionStorage.clear();
      localStorage.clear();
      resolve(true);
    })
    // const dataLogout
  }
}
