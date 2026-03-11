import { RouterLink } from '@angular/router';
import { LoginFormComponent } from './../../components/login-form/login-form.component';
import { Component } from '@angular/core';
@Component({
  selector: 'app-login-page',
  imports: [LoginFormComponent, RouterLink],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
})
export class LoginPageComponent {

}
