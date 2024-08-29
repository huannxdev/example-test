import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { catchError, of, tap } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { UserService } from '../services/user.service';
import { ErrorResponse } from '../model/response.type';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register-user',
  standalone: true,
  templateUrl: './register-user.component.html',
  styleUrl: './register-user.component.scss',
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule
  ],
})
export class RegisterUserComponent {
  constructor(
    private readonly userService: UserService,
    private readonly formBuilder: FormBuilder,
    private snackBar: MatSnackBar
  ) {}
  registerForm!: FormGroup;
  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  onRegisterUser() {
    if (this.registerForm.valid) {
      const user = this.registerForm.value;
      this.userService
        .registerUser(user.email, user.password)
        .pipe(
          tap(() => {
            this.snackBar.open('Success');
          }),
          catchError((err: HttpErrorResponse ) => {
            this.snackBar.open(err.error.error, undefined, {
              duration: 3000
            });
            return of(err);
          })
        )
        .subscribe();
    }
  }
}
