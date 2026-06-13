import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface Entidad {
  id: string;
  nombre: string;
}

const ENTIDADES_MOCK: Entidad[] = [
  { id: 'panaderia-central', nombre: 'Panadería Central' },
  { id: 'pasteleria-norte', nombre: 'Pastelería Norte' },
  { id: 'reposteria-express', nombre: 'Repostería Express' },
  { id: 'sucursal-sur', nombre: 'Sucursal Sur' },
];

@Component({
  selector: 'app-select-entity',
  imports: [FormsModule],
  templateUrl: './select-entity.html',
  styleUrl: './select-entity.css',
})
export class SelectEntity {

  private readonly router = inject(Router);

  entidades = ENTIDADES_MOCK;
  entidadSeleccionada = '';

  continuar(): void {
    if (!this.entidadSeleccionada) return;
    this.router.navigate(['/facturas']);
  }
}
