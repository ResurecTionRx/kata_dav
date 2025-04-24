import { Component, OnInit } from '@angular/core';
import { EventService } from 'app/core/services/event.service'; 
import { Event } from 'app/models/event.model';
import { CommonModule } from '@angular/common'; 
import { RouterModule } from '@angular/router'; 


@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css'],
  imports: [CommonModule, RouterModule], 
})
export class EventosComponent implements OnInit {
  events: Event[] = [];

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.eventService.getEvents().subscribe({
      next: (data) => (this.events = data),
      error: (err) => console.error('Error al cargar eventos', err),
    });
  }
}
