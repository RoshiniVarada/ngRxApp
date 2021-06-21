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
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './backend/auth.guard';
import { LoginEffect } from './store/effects/login.effects';

const routes: Routes = [
  {
    path: 'sign-in',
    component: LoginComponent,
  },
  {
    path: 'sign-up',
    component: RegisterComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    component: LoginComponent,
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    StoreModule.forFeature('auth', reducers),
    EffectsModule.forFeature([RegisterEffect,LoginEffect])
  ],
  declarations: [RegisterComponent, LoginComponent, DashboardComponent],
  providers: [
    AuthService
  ],
})
export class AuthModule {}
