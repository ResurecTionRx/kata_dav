import { Component, OnInit } from '@angular/core';
import { CommonModule }        from '@angular/common';
import { Router, RouterModule } from '@angular/router';

import { EventService } from 'app/core/services/event.service';
import { Event }        from 'app/models/event.model';

@Component({
  selector:      'admin-events-list',
  standalone:    true,
  templateUrl:   './admin-events-list.component.html',
  styleUrls:     ['./admin-events-list.component.css'],
  imports:       [CommonModule, RouterModule],
})
export class AdminEventsListComponent implements OnInit {
  events: Event[] = [];
  loading         = true;

  constructor(
    private svc:    EventService,
    private router: Router
  ) {}

  ngOnInit(): void { this.load(); }

  /** Carga o recarga la lista */
  load(): void {
    this.loading = true;
    this.svc.list().subscribe({
      next:  evts => { this.events = evts; this.loading = false; },
      error: err  => { console.error(err); this.loading = false; },
    });
  }

  /* Navegación ---------------------------------------------------- */
  create(): void         { this.router.navigate(['admin/events/new']); }
  edit(evt: Event): void { this.router.navigate(['admin/events', evt.id, 'edit']); }

  /* Borrar -------------------------------------------------------- */
  remove(evt: Event): void {
    if (!confirm(`¿Eliminar "${evt.name}"?`)) { return; }
    this.svc.delete(evt.id!).subscribe(() => this.load());
  }
}
