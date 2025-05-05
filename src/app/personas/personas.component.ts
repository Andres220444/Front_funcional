import { Component, OnInit } from '@angular/core';
import { MiservicioService } from '../miservicio.service';

@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html',
  styleUrls: ['./personas.component.css']
})
export class PersonasComponent implements OnInit {
  personas: any[] = [];
  personasFiltradas: any[] = [];
  filtroEmpleado: string = '';
  loading = true;

  constructor(private servicio: MiservicioService) {}

  ngOnInit(): void {
    this.servicio.getPersonas().subscribe({
      next: (data) => {
        this.personas = data;
        this.personasFiltradas = data; // Mostrar todos al inicio
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al obtener personas', err);
        this.loading = false;
      }
    });
  }

  filtrarPersonas(): void {
    const filtro = this.filtroEmpleado.trim().toLowerCase();
    if (filtro === '') {
      this.personasFiltradas = this.personas;
    } else {
      this.personasFiltradas = this.personas.filter(p =>
        (`${p.Nombre1_Persona} ${p.Apellido1_Persona}`).toLowerCase().includes(filtro)
      );
    }
  }
}
