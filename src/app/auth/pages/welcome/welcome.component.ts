import { Component } from '@angular/core';
import { AuthCardComponent } from '../../components/auth-card/auth-card.component';
import { LogoHeaderComponent } from '../../components/logo-header/logo-header.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-welcome',
  imports: [AuthCardComponent,LogoHeaderComponent,NgIf],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent {

}
