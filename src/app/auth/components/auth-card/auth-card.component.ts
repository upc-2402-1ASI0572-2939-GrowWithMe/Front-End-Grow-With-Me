import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {AuthFormComponent} from '../auth-form/auth-form.component';

@Component({
  selector: 'app-auth-card',
  templateUrl: './auth-card.component.html',
  imports: [
    AuthFormComponent
  ],
  styleUrls: ['./auth-card.component.css']
})
export class AuthCardComponent {
  mode: 'login' | 'register' | 'reset' = 'login';

  constructor(private route: ActivatedRoute) {
    const path = route.snapshot.routeConfig?.path;

    if (path === 'register') this.mode = 'register';
    else if (path === 'reset') this.mode = 'reset';
    else this.mode = 'login';
  }
}
