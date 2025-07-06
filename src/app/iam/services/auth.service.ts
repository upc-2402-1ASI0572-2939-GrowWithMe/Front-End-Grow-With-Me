import axios, { AxiosInstance } from 'axios';
import {environment} from '../../environments/environment';

export class AuthService {
  http: AxiosInstance;

  constructor() {
    this.http = axios.create({
      baseURL: environment.baseUrl
    });
  }

  async signInUser(email: any, password: any) {
    try {
      const response = await this.http.post('/authentication/sign-in', {
        email,
        password
      });

      if (response.data.token) {
        localStorage.setItem('authToken', response.data.token);
      }

      return response;
    } catch (error: any) {
      console.error("Login failed", error);
      return error.response;
    }
  }

  async signUp(data: any) {
    try {
      return await this.http.post('/authentication/sign-up', data);
    } catch (error: any) {
      console.error("Sign-up failed", error);
      return error.response;
    }
  }
}
