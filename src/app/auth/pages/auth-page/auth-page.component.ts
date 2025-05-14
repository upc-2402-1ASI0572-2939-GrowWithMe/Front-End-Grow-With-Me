import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthCardComponent } from '../../components/auth-card/auth-card.component';
import { AuthFormComponent } from '../../components/auth-form/auth-form.component';
import { InputFieldComponent } from '../../components/input-field/input-field.component';
import { LogoHeaderComponent } from '../../components/logo-header/logo-header.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-auth-page',
  imports: [AuthCardComponent, AuthFormComponent, InputFieldComponent, LogoHeaderComponent,NgIf],
  templateUrl: './auth-page.component.html',
  styleUrl: './auth-page.component.css'
})
export class AuthPageComponent {
    mode: 'login' | 'register' | 'reset' = 'login';
    constructor(private route: ActivatedRoute) {
        this.route.url.subscribe(url => {
          const path = url[0]?.path;
          if (path === 'register' || path === 'reset') {
            this.mode = path;
          } else {
            this.mode = 'login';
          }
        });
      }
}
