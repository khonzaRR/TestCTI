import { NgModule } from '@angular/core';
import { Routes,
     RouterModule } from '@angular/router';
import { FormComponent } from './form/form.component';
import { TableComponent } from './table/table.component';



const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Home'
    },
    children : [
        {
            path : '',
            component: TableComponent,
            data :{
                title : ''
            }
        },
        {
            path:':index',
            component : FormComponent,
            data : {
                title : 'Detail'
            }
        }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {}