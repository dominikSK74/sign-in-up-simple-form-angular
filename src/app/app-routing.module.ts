import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from "./main/login/login.component";
import {RouterModule, Routes} from "@angular/router";


const routes: Routes = [
  { path: "login", component: LoginComponent },
  {path: "", pathMatch: "full", redirectTo: "login"},
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule { }
