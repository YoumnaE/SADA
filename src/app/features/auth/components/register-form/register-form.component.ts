import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from './../../services/auth.service';
import { Component, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Stored_Keys } from '../../../../core/constants/stored-keys';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register-form',
  imports: [ReactiveFormsModule],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css',
})
export class RegisterFormComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  registerForm = new FormGroup({
    name: new FormControl('',[Validators.minLength(3),Validators.required]),
    email: new FormControl('',[Validators.required, Validators.email]),
    password: new FormControl('',[Validators.required,Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/)]),
    rePassword: new FormControl('',[Validators.required, ]),
    dateOfBirth: new FormControl('',[Validators.required]),
    gender: new FormControl('',[Validators.required]),
  }
  ,
  {
    validators:[this.passwordMissmatch]
  }
);

  onRegisterSubmit(){
    this.registerForm.markAllAsTouched();
    if(this.registerForm.valid){
      this.registerForm.reset();
      this.registerForm.get('gender')?.setValue('');
      this.authService.register(this.registerForm.setValue).subscribe({
        next:(response:any) => {
          console.log(response)
          localStorage.setItem(Stored_Keys.userData, JSON.stringify(response.data.user))
        },
          error:(error: HttpErrorResponse)=>{
            console.log(error);
          }
      })
    }
  }

  passwordMissmatch(formGroup:AbstractControl){
    const password = formGroup.get('password')?.value;
    const repassword= formGroup.get('rePassword')?.value;
    return password === repassword ? null:{missMatch: true}
  }
}
