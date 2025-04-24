import { Component, OnInit }              from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule }                   from '@angular/common';

import { EventService } from 'app/core/services/event.service';
import { Event as EventModel }        from 'app/models/event.model';

@Component({
  selector:    'admin-event-form',
  standalone:  true,
  templateUrl: './admin-event-form.component.html',
  styleUrls:   ['./admin-event-form.component.css'],
  imports:     [CommonModule, ReactiveFormsModule, RouterModule],
})
export class AdminEventFormComponent implements OnInit {

  /** Declaramos la propiedad; la inicializamos en el constructor */
  form!: FormGroup;
  editing = false;

  constructor(
    private fb:     FormBuilder,
    private svc:    EventService,
    private route:  ActivatedRoute,
    private router: Router,
  ) {
    /* -- inicializamos aquí porque ahora sí existe this.fb -- */
    this.form = this.fb.group({
      id:            [null as number | null],
      name:          ['', Validators.required],
      description:   ['', Validators.required],
      date:          ['', Validators.required],
      capacity:      [0,  [Validators.required, Validators.min(1)]],
      imageBase64:   [''],
      status:        ['ACTIVE', Validators.required],
      reservedCount: [{ value: 0, disabled: true }],
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.editing = true;
      this.svc.get(+id).subscribe(evt => this.form.patchValue(evt as any));
    }
  }

  /* ---------------------- Crear / Actualizar --------------------- */
  save(): void {
    if (this.form.invalid) { return; }

    const value = this.form.getRawValue() as EventModel;
    const req   = this.editing ? this.svc.update(value) : this.svc.create(value);

    req.subscribe(() => this.router.navigate(['/admin/events']));
  }

  /* ---------------- Imagen -> Base64 ----------------------------- */
imageToBase64(e: Event): void {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (!file) return;
  
    const reader = new FileReader();
    reader.onload = () => this.form.patchValue({ imageBase64: reader.result as string });
    reader.readAsDataURL(file);
  }
  
}
