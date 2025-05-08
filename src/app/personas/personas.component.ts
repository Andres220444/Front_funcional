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

  // Datos para formulario
  mostrarModal: boolean = false;
  nuevoEmpleado: any = {};
  personasSelect: any[] = []; // Lista de personas disponibles
  cargos: any[] = [];
  departamentos: any[] = [];
  estadosEmpleado: any[] = []; // Estados del empleado (activo, inactivo, etc.)

  constructor(private servicio: MiservicioService) {}

  ngOnInit(): void {
    this.obtenerDatos();
  }

  obtenerDatos() {
    this.servicio.get('Personal').subscribe(data => {
      this.personas = data;
      this.personasFiltradas = data;
      this.loading = false;
    });

    // Cargar datos relacionados
    this.servicio.get('Personas').subscribe(data => {
      this.personasSelect = data;
    });

    this.servicio.get('Universal/9')?.subscribe(data => {
      this.cargos = data;
    }); // Cambia 10 por el ID correcto de "Cargos"

    this.servicio.get('Universal/9')?.subscribe(data => {
      this.departamentos = data;
    }); // Cambia 11 por el ID correcto de "Departamentos"



    // Cargar estados de empleado
  this.servicio.get('Universal/7')?.subscribe(data => { // Cambia 12 por el ID correcto de "Estados de Empleado"
    this.estadosEmpleado = data;
  });
  }

  filtrarPersonas(): void {
    const filtro = this.filtroEmpleado.trim().toLowerCase();
    if (!filtro) {
      this.personasFiltradas = this.personas;
    } else {
      this.personasFiltradas = this.personas.filter(p =>
        `${p.Nombre1_Persona} ${p.Apellido1_Persona}`.toLowerCase().includes(filtro)
      );
    }
  }

  abrirModalNuevo() {
    this.nuevoEmpleado = {};
    this.mostrarModal = true;
  }

  cerrarModal() {
    this.mostrarModal = false;
    this.nuevoEmpleado = {};
  }

  guardarEmpleado() {
    this.servicio.post('Personal', this.nuevoEmpleado).subscribe(() => {
      this.cerrarModal();
      this.obtenerDatos(); // Recargar lista
    });
  }

  eliminarEmpleado(id: number): void {
    if (confirm('¿Estás seguro de eliminar este empleado?')) {
      this.servicio.delete(`Personal/${id}`).subscribe(() => {
        this.obtenerDatos(); // Recargar lista
      });
    }
  }
}