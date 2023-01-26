import { NgModule } from '@angular/core';
import { HomeRoutingModule } from './home-routing.module';
import {CommonModule} from '@angular/common'
import { TableComponent } from './table/table.component';
import { FormComponent } from './form/form.component';
import {MatTableModule} from '@angular/material/table';
import {  MatButtonModule } from '@angular/material/button';
import {  MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import {MatCardModule} from '@angular/material/card';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
// import { ModalModule } from '@coreui/angular';


@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatTableModule,
    MatButtonModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSortModule,
    MatCardModule,
    FontAwesomeModule,
    // ModalModule
],
declarations: [
  TableComponent,
  FormComponent
]
  
})
export class HomeModule {
}