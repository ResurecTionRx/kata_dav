import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  constructor(private router: Router) {}

  verMisReservas(): void {
    const email = localStorage.getItem('email');
    if (email) {
      this.router.navigate(['/mis-eventos'], {
        queryParams: { email }
      });
    } else {
      alert('No se encontró el correo del usuario.');
    }
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  get isAdmin(): boolean {
    return localStorage.getItem('role') === 'ADMIN';
  }

  closeCanvas() {
    document.querySelector<HTMLDivElement>('#offcanvasNav')!
            .classList.remove('show');
  }
  

  
}
