import { Routes } from '@angular/router';
import { DreamListComponent } from './components/dream-list/dream-list.component';
import { DreamFormComponent } from './components/dream-list/dream-form/dream-form.component';

export const routes: Routes = [
  { path: '', component: DreamListComponent },
  { path: 'dreams', component: DreamListComponent },
  { path: 'add-dream', component: DreamFormComponent },
];

