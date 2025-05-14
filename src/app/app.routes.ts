import { Routes } from '@angular/router';
import { HomeComponent } from './public/pages/home/home.component';
import { TableCropsComponent } from './crops/pages/table-crops/table-crops.component';
import { CalendarPageComponent } from './crops/pages/calendar-page/calendar-page.component';
import { MonitoringCropsComponent } from './crops/pages/monitoring-crops/monitoring-crops.component';
import { MyConsultantPageComponent } from './consultations/pages/my-consultant-page/my-consultant-page.component';
import { HistoryViewComponent } from './consultations/pages/history-view/history-view.component';
import { FarmersListComponent } from './profile/pages/farmers-list/farmers-list.component';
import { MyDevicesPageComponent } from './devices/pages/my-devices-page/my-devices-page.component';
import { NotificationListComponent } from './notifications/pages/notification-list/notification-list.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'crops', component: TableCropsComponent },
  { path: 'crops/:id/calendar', component: CalendarPageComponent },
  { path: 'crops/:id/monitoring', component: MonitoringCropsComponent },
  { path: 'consultants', component: MyConsultantPageComponent },
  { path: 'consultants/:id/history', component: HistoryViewComponent },
  { path: 'farmers', component: FarmersListComponent },
  { path: 'devices', component: MyDevicesPageComponent },
  { path: 'notifications', component: NotificationListComponent }
];
