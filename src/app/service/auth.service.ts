import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userLogin : any ;

  constructor() { }

  login(data : any, rememberMe : boolean): Promise<any> {
    // debugger
    console.log(data);
    console.log(this.userLogin);
    this.userLogin = data;
    console.log(rememberMe);
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
          expiry : now.getTime() + 1*60*1000 //one hour
        }
        sessionStorage.setItem('userLogin', JSON.stringify(item));
        localStorage.setItem('userLogin', JSON.stringify(item));
      }
      // const item = {
      //   value : {
      //     id : data.id,
      //     username : data.login.username,
      //   },
      //   expiry : now.getTime() + 5*60*1000
      // }
      // console.log(localStorage.getItem('userLogin'));

      resolve(true);
    })
  }

  isLoggedIn(): boolean{
    const itemStr = localStorage.getItem('userLogin');
    if(!itemStr){
      return false;
    }

    const item = JSON.parse(itemStr);
    console.log(item);
    if(!item.expiry){

      console.log(localStorage.getItem('userLogin'))
      return !!(localStorage.getItem('userLogin') && sessionStorage.getItem('userLogin'));
    }else{
      console.log(localStorage.getItem('userLogin'))
      const now = new Date();
      if(now.getTime() > item.expiry){
        sessionStorage.removeItem('userLogin')
        localStorage.removeItem('userLogin');
        sessionStorage.clear();
        localStorage.clear();
        // alert('Network Timeout');
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
