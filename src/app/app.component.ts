import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './shared/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, CommonModule, NavbarComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  constructor(private router: Router) {}

  esRutaAuth(): boolean {
    const ruta = this.router.url;
    return ruta.includes('/login') || ruta.includes('/register');
  }
}
