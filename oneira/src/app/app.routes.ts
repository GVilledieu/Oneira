import { Routes } from '@angular/router';
import { DreamListComponent } from './components/dream-list/dream-list.component';

export const routes: Routes = [
  { path: '', component: DreamListComponent },
  { path: 'dreams', component: DreamListComponent },
];

