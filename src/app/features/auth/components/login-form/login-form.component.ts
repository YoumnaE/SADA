import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from './../../services/auth.service';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Stored_Keys } from '../../../../core/constants/stored-keys';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  standalone: true, // Recommended for Angular 17+
  imports: [ReactiveFormsModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css',
})
export class LoginFormComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  isLoading = false;
  errorMessage = '';

  onLoginSubmit() {
    this.loginForm.markAllAsTouched();
    
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';
      
      const { email, password } = this.loginForm.value;
      
      // Use non-null assertion (!) because we know the form is valid here
      this.authService.login(email!, password!).subscribe({
        next: (response: any) => {
          this.isLoading = false;
          
          if (response.data?.user) {
            localStorage.setItem(
              Stored_Keys.userData,
              JSON.stringify(response.data.user)
            );
            // Navigate to the main application page
            this.router.navigate(['/feed']);
          }
        },
        error: (error: any) => {
          this.isLoading = false;
          // Supabase errors often come in error.message directly
          this.errorMessage = error.message || 'Invalid email or password.';
          console.error('Login error details:', error);
        }
      });
    }
  }
}