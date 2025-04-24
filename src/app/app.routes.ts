import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { EventosComponent } from './pages/eventos/eventos.component';
import { MisEventosComponent } from './pages/mis-eventos/mis-eventos.component';


export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'eventos', component: EventosComponent },
  { path: 'mis-eventos', component: MisEventosComponent },
  

  {
    path: 'eventos/:id',
    loadComponent: () =>
      import('./pages/eventos/evento-detalle.component').then(m => m.EventoDetalleComponent),
  },
  { 
    path: 'admin/events',
    loadChildren: () => import('./pages/admin-events/admin-events.routes')
  }
];