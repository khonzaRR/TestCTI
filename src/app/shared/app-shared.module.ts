import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatTableModule} from '@angular/material/table';
import { ModalModule } from '@coreui/angular';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    ModalModule,
    FontAwesomeModule
        
  ],
  exports : [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    ModalModule,
    FontAwesomeModule
  ]
})
export class AppSharedModuleModule { }
