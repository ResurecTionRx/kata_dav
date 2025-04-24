import { Routes } from '@angular/router';
import { AdminEventsListComponent } from './list/admin-events-list.component';
import { AdminEventFormComponent }  from './form/admin-event-form.component';

export default [
  { path: '',         component: AdminEventsListComponent },
  { path: 'new',      component: AdminEventFormComponent },
  { path: ':id/edit', component: AdminEventFormComponent },
] as Routes;
