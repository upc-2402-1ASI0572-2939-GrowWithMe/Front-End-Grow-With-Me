import { Routes } from '@angular/router';
import {HomeComponent} from './public/pages/home/home.component';
import {TableCropsComponent} from './crops/pages/table-crops/table-crops.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent},
  { path: 'crops', component: TableCropsComponent},
];
