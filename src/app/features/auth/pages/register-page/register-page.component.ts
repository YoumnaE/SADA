import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { RegisterFormComponent } from "../../components/register-form/register-form.component";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-register-page',
  imports: [ReactiveFormsModule, RegisterFormComponent, RouterLink],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css',
})
export class RegisterPageComponent {
  username= new FormControl(null,[Validators.required,Validators.minLength(3),Validators.maxLength(25)])
  onEmailSubmit():void{
    
  }
}
