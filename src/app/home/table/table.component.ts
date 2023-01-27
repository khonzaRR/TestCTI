import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import dataUser from '../../../assets/data.json';
import { DataUser } from 'src/app/model/dataUser.model';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';
import {Modal} from 'bootstrap';
import { IdModel } from 'src/app/model';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit{
  
  @ViewChild(MatPaginator) set matPaginator(paginator: MatPaginator){
    this.dataSourceUsers.paginator = paginator;
  };

  @ViewChild('userTbSort') userTbSort = new MatSort();

  displayColumns : string[] = ['No','Name', 'email', 'gender', "Action"];

  userView : any;
  faHome = faHome;

  element : any;
  logoutModal : any;

  elementTimeout : any;
  timeoutModal : any;

  dataLoginJson : any ;
  dataLogin : DataUser[] = [];
  idDataUser : IdModel [] = [];
  isLogout : boolean = false;

  dataSourceUsers = new MatTableDataSource<DataUser>(dataUser.results);
  
  constructor(
    private authService : AuthService,
    private router : Router  
  ){
    this.dataLoginJson = JSON.parse(localStorage.getItem('userLogin') || '{}')

    this.dataSourceUsers.filteredData.find( data =>{
      if(data.login.uuid == this.dataLoginJson.value.id && data.id.name == this.dataLoginJson.value.username){
        this.dataLogin.push(data); 
      }
      
    })

  }
  
  ngAfterViewInit(){
    this.userTbSort.disableClear = true;
    this.dataSourceUsers.sort = this.userTbSort;
    this.dataSourceUsers.sortingDataAccessor = (row: DataUser, columnName : string) : string =>{

      if(columnName=="No") return this.dataSourceUsers.filteredData.indexOf(row).toString();
      if(columnName=="Name") return row.name.first + row.name.last;
      var columnName = row[columnName as keyof DataUser] as string;
      return columnName;
    }
  }

  ngOnInit(): void {
    this.element = document.getElementById('modalLogout') as HTMLElement;
    this.logoutModal = new Modal(this.element);
    this.elementTimeout = document.getElementById('networkTimeout') as HTMLElement;
    this.timeoutModal = new Modal(this.elementTimeout);
    this.isNetworkTimeout();
    // this.checkIsLoggedIn();
  }

  openModal(){
    this.logoutModal.show();
  }

  timeOut(){
    this.timeoutModal.hide()
    this.router.navigate(['/login']);
  }

  searchData(data : Event){
    const value = (data.target as HTMLInputElement).value;
    this.dataSourceUsers.filter = value.trim().toLowerCase();
  }

  logout(){
    this.logoutModal.hide();
    this.authService.logoutUser().then(() =>{
      this.router.navigate(['/login']);
    })
  }

  // checkIsLoggedIn(){
  //   let check = setInterval(this.isNetworkTimeout, 0.5*60*1000);

  //   if(!this.isNetworkTimeout){
  //     setTimeout(() =>{clearInterval(check)})
  //   }
  // }

  isNetworkTimeout() : boolean{
    // const isLoggedInService = this.authService.isLoggedIn();
    if(!this.authService.isLoggedIn()){    
      alert('network timeout');
      this.router.navigate(['/login'])
      // this.timeoutModal.show()
      // this.timeoutModal.backdrop = 'static';
      return false
    } else{
      return true;
    }
  }

}
