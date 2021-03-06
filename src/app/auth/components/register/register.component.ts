import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';

import { registerAction } from '../../store/actions/register.actions';
import { errorMessage, isSubmittingSelector } from '../../store/selectors';
import { User } from '../../../shared/types/user';
import { RegisterRequest } from '../../types/registerRequest';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  isSubmitting$: Observable<boolean>;
  errorMessage: any;

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private authService: AuthService
  ) {
    this.store.pipe(select(errorMessage)).subscribe((errors:any) =>{
      if(errors)
      this.errorMessage= `${Object.keys(errors)[0]}  ${Object.values(errors)[0]}`;
      console.log(this.errorMessage);
   });
   
  }

  ngOnInit(): void {
    this.initializeForm();
    this.initializeValue();
  }
  initializeValue(): void {
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector));
    console.log(this.isSubmitting$);
  }

  initializeForm(): void {
    this.form = this.fb.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {
    const request:RegisterRequest = {
      user:this.form.value
    }
    this.store.dispatch(registerAction({request}));
  }
}
