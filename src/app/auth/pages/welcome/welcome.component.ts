import { Component } from '@angular/core';
import { AuthCardComponent } from '../../components/auth-card/auth-card.component';
import { LogoHeaderComponent } from '../../components/logo-header/logo-header.component';
import { NgIf } from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-welcome',
  imports: [LogoHeaderComponent, RouterLink],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent {

}
