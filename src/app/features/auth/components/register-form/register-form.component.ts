import { AuthService } from './../../services/auth.service';
import { Component, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Stored_Keys } from '../../../../core/constants/stored-keys';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css',
})
export class RegisterFormComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  registerForm = new FormGroup({
    name: new FormControl('', [Validators.minLength(3), Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/)
    ]),
    rePassword: new FormControl('', [Validators.required]),
    dateOfBirth: new FormControl('', [Validators.required]),
    gender: new FormControl('', [Validators.required]),
  },
  {
    validators: [this.passwordMissmatch]
  });

  onRegisterSubmit() {
    this.registerForm.markAllAsTouched();

    if (this.registerForm.valid) {
      const email = this.registerForm.get('email')?.value!;
      const password = this.registerForm.get('password')?.value!;
      const name = this.registerForm.get('name')?.value!;
      const dateOfBirth = this.registerForm.get('dateOfBirth')?.value!;
      const gender = this.registerForm.get('gender')?.value!;

      this.authService.register(email, password, name, dateOfBirth, gender).subscribe({
        next: (response: any) => {
          console.log('Registration Success:', response);

          if (response.data?.user) {
            localStorage.setItem(Stored_Keys.userData, JSON.stringify(response.data.user));
          }

          this.registerForm.reset();
          this.registerForm.get('gender')?.setValue('');

          this.router.navigate(['/login']);
        },
        error: (error: any) => {
          console.error('Registration Error:', error.message || error);
        }
      });
    }
  }

  passwordMissmatch(formGroup: AbstractControl) {
    const password = formGroup.get('password')?.value;
    const repassword = formGroup.get('rePassword')?.value;
    return password === repassword ? null : { missMatch: true };
  }
}