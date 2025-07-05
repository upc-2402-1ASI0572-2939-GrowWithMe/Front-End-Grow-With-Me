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
  authService = new AuthService();

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      this.selectedFile = input.files[0];
    }
  }
  async onSubmit(event: Event) {
    event.preventDefault();
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

        // Login automático tras registro
        const loginResponse = await this.authService.signInUser(
          user.email as string,
          user.password as string
        );

        this.storeSessionData(loginResponse.data);
        window.location.href = '/home'; // recarga total
      } catch (err) {
        console.error('Error al registrar:', err);
      }
    }

    if (this.mode === 'login') {
      try {
        const response = await this.authService.signInUser(
          formData.get('email') as string,
          formData.get('password') as string
        );
        this.storeSessionData(response.data);
        window.location.href = '/home'; // recarga total
      } catch (err) {
        console.error('Error al iniciar sesión:', err);
      }
    }

    if (this.mode === 'reset') {
      console.log('Funcionalidad de restablecer contraseña aún no implementada.');
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
