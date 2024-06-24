import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { authActions } from '../../store/action';
import { RegisterRequestInterface } from '../../types/registerRequest.interface';
import { RouterLink } from '@angular/router';
import {
  selectIsSubmitting,
  selectValidationErrors,
} from '../../store/reducers';
import { CommonModule } from '@angular/common';
import { combineLatest } from 'rxjs';
import { backendErrorMessages } from '../../../shared/components/backendErrorMessages/backendErrorMessages.component';

@Component({
  selector: 'mc-register',
  templateUrl: './register.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    CommonModule,
    backendErrorMessages,
  ],
})
export class RegisterComponent {
  form = this.fb.nonNullable.group({
    username: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  data$ = combineLatest({
    isSubmitting: this.store.select(selectIsSubmitting),
    backendErrors: this.store.select(selectValidationErrors),
  });

  constructor(
    private fb: FormBuilder,
    private store: Store //private authService: AuthService
  ) {}

  onSubmit() {
    console.log('form', this.form.getRawValue());
    const request: RegisterRequestInterface = {
      user: this.form.getRawValue(),
    };
    this.store.dispatch(authActions.register({ request }));
  }
}
