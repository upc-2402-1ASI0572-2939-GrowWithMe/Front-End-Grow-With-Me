import { Routes } from '@angular/router';
import { HomeComponent } from './public/pages/home/home.component';
import { TableCropsComponent } from './crops/pages/table-crops/table-crops.component';
import { CalendarPageComponent } from './crops/pages/calendar-page/calendar-page.component';
import { MonitoringCropsComponent } from './crops/pages/monitoring-crops/monitoring-crops.component';
import {MyConsultantPageComponent} from './consultations/pages/my-consultant-page/my-consultant-page.component';
import {HistoryViewComponent} from './consultations/pages/history-view/history-view.component';
import {FarmersListComponent} from './profile/pages/farmers-list/farmers-list.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Ruta predeterminada
  { path: 'home', component: HomeComponent }, // Página de inicio
  { path: 'crops', component: TableCropsComponent }, // Tabla de cultivos
  { path: 'crops/:id/calendar', component: CalendarPageComponent }, // Calendario de cultivos
  { path: 'crops/:id/monitoring', component: MonitoringCropsComponent }, // Monitoreo de cultivos
  { path: 'consultants', component: MyConsultantPageComponent },
  { path: 'consultants/:id/history', component: HistoryViewComponent },
  { path: 'farmers', component: FarmersListComponent}
];
