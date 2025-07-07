import { Component, inject, Input } from '@angular/core';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { CloudinaryService } from '../../../shared/services/cloudinary.service';
import { AuthService } from '../../../iam/services/auth.service';
import { RoleService } from '../../../iam/services/role.service';

@Component({
  selector: 'app-auth-form',
  standalone: true,
  templateUrl: './auth-form.component.html',
  imports: [NgIf],
  styleUrls: ['./auth-form.component.css']
})
export class AuthFormComponent {
  @Input() mode: 'login' | 'register' | 'reset' = 'login';

  private roleService = inject(RoleService);
  private router = inject(Router);

  selectedFile!: File;
  photoUrl: string = '';
  errorMessage: string = '';
  authService = new AuthService();

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      this.selectedFile = input.files[0];
    }
  }

  async onSubmit(event: Event) {
    event.preventDefault();
    this.errorMessage = '';

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    if (this.mode === 'register') {
      try {
        const { secure_url } = await CloudinaryService.uploadImage(this.selectedFile);
        this.photoUrl = secure_url;

        const user = {
          email: formData.get('email'),
          roles: [formData.get('roles')],
          firstName: formData.get('firstName'),
          lastName: formData.get('lastName'),
          dni: formData.get('dni'),
          phone: formData.get('phone'),
          photoUrl: this.photoUrl,
          password: formData.get('password'),
          repeatPassword: formData.get('repeatPassword')
        };

        await this.authService.signUp(user);

        const loginResponse = await this.authService.signInUser(
          user.email as string,
          user.password as string
        );

        if (loginResponse.status === 200 && loginResponse.data?.token) {
          this.storeSessionData(loginResponse.data);
          window.location.href = '/home';
        } else {
          this.errorMessage = 'Login failed after registration.';
        }
      } catch (err: any) {
        console.error('Error al registrar:', err);
        this.errorMessage = err?.response?.data?.message || 'Error during registration.';
      }
    }

    if (this.mode === 'login') {
      try {
        const response = await this.authService.signInUser(
          formData.get('email') as string,
          formData.get('password') as string
        );

        if (response.status === 200 && response.data?.token) {
          this.storeSessionData(response.data);
          window.location.href = '/home';
        } else {
          this.errorMessage = 'Login failed. Please check your credentials.';
        }
      } catch (err: any) {
        console.error('Error al iniciar sesión:', err);
        this.errorMessage = err?.response?.data?.message || 'Error during login.';
      }
    }

    if (this.mode === 'reset') {
      this.errorMessage = 'Reset password not implemented yet.';
    }
  }

  private storeSessionData(data: any) {
    localStorage.setItem('authToken', data.token);
    localStorage.setItem('userEmail', data.username);
    localStorage.setItem('userId', data.id);
    localStorage.setItem('userRole', data.roles?.[0] || '');

    const role = data.roles?.[0] === 'FARMER_ROLE' ? 'farmer' : 'consultant';
    this.roleService.setRole(role);
  }
}
