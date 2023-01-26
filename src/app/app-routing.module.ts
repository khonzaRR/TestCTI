import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';


const routes: Routes = [
    
    {
        path: '', 
        redirectTo:'login', 
        pathMatch:'full',

    },
    {
        path: 'login',
        loadChildren: () => import('./login/login.module').then(mod => mod.LoginModule)
    },
    {
        path: 'home',
        data:{
            title: 'Home',
        },
        canActivate : [AuthGuard],
        loadChildren : () => import('./home/home.module').then(mod => mod.HomeModule)
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }