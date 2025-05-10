import { Routes } from '@angular/router';
import {HomeComponent} from './public/pages/home/home.component';
import {TableCropsComponent} from './crops/pages/table-crops/table-crops.component';
import {CalendarPageComponent} from './crops/pages/calendar-page/calendar-page.component';
import {MyConsultantPageComponent} from './consultations/pages/my-consultant-page/my-consultant-page.component';
import {HistoryViewComponent} from './consultations/pages/history-view/history-view.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent},
  { path: 'crops', component: TableCropsComponent },
  { path: 'crops/:id/calendar', component: CalendarPageComponent },
  { path: 'consultants', component: MyConsultantPageComponent },
  { path: 'consultants/:id/history', component: HistoryViewComponent },
];
