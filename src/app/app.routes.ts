import { Routes } from '@angular/router';
import { HomeComponent } from './public/pages/home/home.component';
import { TableCropsComponent } from './crops/pages/table-crops/table-crops.component';
import { CalendarPageComponent } from './crops/pages/calendar-page/calendar-page.component';
import { MonitoringCropsComponent } from './crops/pages/monitoring-crops/monitoring-crops.component';
import { ConsultantComponent } from './consultant/consultant.component';
import { ProfileComponent } from './profile/profile.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Ruta predeterminada
  { path: 'home', component: HomeComponent }, // Página de inicio
  { path: 'crops', component: TableCropsComponent }, // Tabla de cultivos
  { path: 'crops/:id/calendar', component: CalendarPageComponent }, // Calendario de cultivos
  { path: 'monitoring-crops', component: MonitoringCropsComponent }, // Monitoreo de cultivos
  { path: 'consultant', component: ConsultantComponent }, // Perfil del consultor
  { path: 'profile', component: ProfileComponent }, // Mi Perfil
];