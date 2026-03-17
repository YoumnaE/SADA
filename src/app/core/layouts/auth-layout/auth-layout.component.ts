import { RouterOutlet, RouterLinkWithHref, RouterLinkActive } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [RouterOutlet], // Remove RouterLinkWithHref and RouterLinkActive
  templateUrl: './auth-layout.component.html'
})
export class AuthLayoutComponent {
}