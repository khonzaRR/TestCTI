import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { LoginComponent } from "./login.component";
import { CommonModule } from "@angular/common";
import { LoginRoutingModule } from "./login-routing.module";
import {MatProgressBarModule} from '@angular/material/progress-bar'
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
// import { AppSharedModuleModule } from "../shared/app-shared.module";
// import {MatIconModule} from '@angular/material/icon';

@NgModule({
  imports: [
    LoginRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressBarModule,
    FontAwesomeModule,
    // AppSharedModuleModule
  ],
  declarations: [LoginComponent],
})
export class LoginModule {
}