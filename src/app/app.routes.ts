import { Routes } from '@angular/router';
import {HomeComponent} from './public/pages/home/home.component';
import {TableCropsComponent} from './crops/pages/table-crops/table-crops.component';
import {AuthPageComponent} from './auth/pages/auth-page/auth-page.component';
export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent},
  { path: 'crops', component: TableCropsComponent},
// Lazy load del módulo de autenticación
  {
    path: 'auth',
    loadChildren: () =>
      import('./auth/auth.module').then((m) => m.AuthModule)
  }
];
