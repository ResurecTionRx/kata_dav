import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { EventService } from 'app/core/services/event.service';
import { Event } from 'app/models/event.model';
import { ReservationService } from 'app/core/services/reservation.service';
import { ReservationRequest } from 'app/models/reservation.model';
import { getEmailFromToken } from 'app/core/helpers/jwt.helper';


@Component({
  selector: 'app-evento-detalle',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './evento-detalle.component.html'
})
export class EventoDetalleComponent implements OnInit {
  event!: Event;

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService,
    private reservationService: ReservationService

  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.eventService.getEventById(+id).subscribe({
        next: data => this.event = data,
        error: err => console.error('Error al cargar el evento', err)
      });
    }
  }

  reservarEvento(): void {
    const userEmail = getEmailFromToken();
  
    if (!userEmail) {
      alert('No se pudo obtener el correo del usuario');
      return;
    }
  
    const payload: ReservationRequest = {
      eventId: this.event.id,
      userEmail
    };
  
    this.reservationService.reservarEvento(payload).subscribe({
      next: () => alert('Reserva realizada con éxito 🎉'),
      error: (err) => alert('Error al reservar: ' + err.message)
    });
  }
  
  
}
