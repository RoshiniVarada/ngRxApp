import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { loginAction } from '../../store/actions/login.actions';
import { errorMessage, isSubmittingSelector } from '../../store/selectors';
import { LoginRequest } from '../../types/loginRequest';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  isSubmitting$: Observable<boolean>;
  errorMessage: string;


  constructor(
    private fb: FormBuilder,
    private store: Store
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
   
  }

  initializeForm(): void {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {
    const request:LoginRequest = {
      user:this.form.value
    }
    this.store.dispatch(loginAction({request}));
  }

}
