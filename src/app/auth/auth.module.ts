import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';



const routes: Routes = [
    {
      path:"sign-in",
      component:LoginComponent
    },
    {
      path:"sign-up",
      component:RegisterComponent
    }
  ];

@NgModule({
  imports: [CommonModule,RouterModule.forChild(routes),ReactiveFormsModule],
  declarations: [
    RegisterComponent,
    LoginComponent
  ],
})


export class AuthModule {}
