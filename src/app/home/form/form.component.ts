import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DataUser } from 'src/app/model';
import dataUsers from '../../../assets/data.json';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit{

  index : number = 0;
  viewUser : DataUser[] = [];
  dataUserResults = dataUsers.results;
  dateSplit : string = '';
  nationalFlag : string = '';


  constructor(
    private activateRoute : ActivatedRoute,
    public location : Location
  ){}

  ngOnInit(): void {
    this.index = Number(this.activateRoute.snapshot.paramMap.get('index'));
    this.viewUser.push(this.dataUserResults[this.index]);
    
      
  }

  dataDate(date : string) : string {
    let data = date;

    var dataSplit = data.split("",10);
    // this.dataDob = dataSplit.su
    this.dateSplit = dataSplit.join('');

 
    return this.dateSplit;
  }

  getNationalFlag(nat:string): string{
    const link = 'http://purecatamphetamine.github.io/country-flag-icons/3x2/';
    this.nationalFlag = link+nat+'.svg';

    return this.nationalFlag;
  }

  locationBack(){
    this.location.back();
  }

}
