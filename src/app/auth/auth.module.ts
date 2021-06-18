import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { reducers } from './store/reducers';
import { AuthService } from './services/auth.service';
import { EffectsModule } from '@ngrx/effects';
import { RegisterEffect } from './store/effects/register.effects';




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
  imports: 
  [CommonModule,
   RouterModule.forChild(routes),
   ReactiveFormsModule,
   StoreModule.forFeature('auth',reducers),
   EffectsModule.forFeature([RegisterEffect])
],
  declarations: [
    RegisterComponent,
    LoginComponent
  ],
  providers:[AuthService]
})


export class AuthModule {}
