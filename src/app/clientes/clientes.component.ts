import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MiservicioService } from '../miservicio.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {
  clientes: any[] = [];
  loading: boolean = true;
  error: boolean = false;
  searchTerm: string = '';

  // Datos para formulario
  mostrarModal: boolean = false;
  nuevoCliente: any = {};
  personas: any[] = [];
  tiposCliente: any[] = [];
  estadosCliente: any[] = [];

  constructor(private http: HttpClient, private miServicio: MiservicioService) {}

  ngOnInit(): void {
    this.getClientes();
    this.cargarDatosSelectores(); // Cargar personas, tipos y estados
  }

  getClientes(): void {
    this.miServicio.get('Clientes').subscribe(data => {
      this.clientes = data;
      this.loading = false;
    }, err => {
      console.error('Error al obtener clientes', err);
      this.loading = false;
      this.error = true;
    });
  }

  get clientesFiltrados() {
    if (!this.searchTerm) return this.clientes;
    const term = this.searchTerm.toLowerCase();
    return this.clientes.filter(cliente => {
      const nombreCompleto = `${cliente.Nombre1_Persona} ${cliente.Nombre2_Persona || ''} ${cliente.Apellido1_Persona} ${cliente.Apellido2_Persona || ''}`;
      return nombreCompleto.toLowerCase().includes(term);
    });
  }

  cargarDatosSelectores(): void {
    this.miServicio.get('Personas').subscribe(data => {
      this.personas = data.map((p: any) => ({
        id_Persona: p.id_Persona,
        Nombre1_Persona: p.Nombre1_Persona,
        Apellido1_Persona: p.Apellido1_Persona,
        Num_Doc_Persona: p.Num_Doc_Persona
      }));
    });

    this.miServicio.get('Universal/10')?.subscribe(data => {
      this.tiposCliente = data;
    }); // Cambia 10 por el ID correcto de "Tipos de Cliente"

    this.miServicio.get('Universal/7')?.subscribe(data => {
      this.estadosCliente = data;
    }); // Cambia 11 por el ID correcto de "Estados de Cliente"
  }

  abrirModalNuevo(): void {
    this.nuevoCliente = {};
    this.mostrarModal = true;
  }

  cerrarModal(): void {
    this.mostrarModal = false;
    this.nuevoCliente = {};
  }

  guardarCliente(): void {
    this.miServicio.post('Clientes', this.nuevoCliente).subscribe(() => {
      this.getClientes();
      this.cerrarModal();
    });
  }

  eliminarCliente(id: number): void {
    if (confirm('¿Estás seguro de eliminar este cliente?')) {
      this.miServicio.delete(`Clientes/${id}`).subscribe(() => {
        this.getClientes();
      });
    }
  }
}