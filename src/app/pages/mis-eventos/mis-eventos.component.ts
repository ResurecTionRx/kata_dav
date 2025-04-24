import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mis-eventos',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './mis-eventos.component.html'
})
export class MisEventosComponent implements OnInit {
  reservas: any[] = [];

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    const email = localStorage.getItem('email'); // Recuperar el email desde localStorage
    const token = localStorage.getItem('token'); // Recuperar el token JWT

    if (email && token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`
      });

      this.http.get<any[]>(`http://localhost:8082/api/reservations/user/${email}`, { headers })
        .subscribe({
          next: res => this.reservas = res,
          error: err => console.error('Error al cargar reservas', err)
        });
    } else {
      console.error('No se encontró el email o token en localStorage');
    }
  }
}
