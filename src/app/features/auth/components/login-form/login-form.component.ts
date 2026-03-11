import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from './../../services/auth.service';
import { Component, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Stored_Keys } from '../../../../core/constants/stored-keys';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login-form',
  imports: [ReactiveFormsModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css',
})
export class LoginFormComponent {
private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  loginForm = new FormGroup({
    email: new FormControl('',[Validators.required]),
    password: new FormControl('',[Validators.required]),
  }
);


  handleLoginSuccessResponse(response: any):void{
    this.router.navigate(['/feed']);
    localStorage.setItem(Stored_Keys.userData, JSON.stringify(response.data.user))
  }
  onLoginSubmit(){
    this.loginForm.markAllAsTouched();
    if(this.loginForm.valid){
      this.loginForm.reset();
      this.authService.login(this.loginForm.value).subscribe({
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
}