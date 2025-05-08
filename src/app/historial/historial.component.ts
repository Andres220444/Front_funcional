import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MiservicioService } from '../miservicio.service';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent implements OnInit {
  historial: any[] = [];
  loading: boolean = true;
  error: boolean = false;
  searchTerm: string = '';
  mostrarModal: boolean = false;
  esEdicion: boolean = false;
  registroActual: any = {};

  constructor(private http: HttpClient, private miServicio: MiservicioService) {}

  ngOnInit(): void {
    this.getHistorial();
  }

  getHistorial(): void {
    this.miServicio.get('Historial').subscribe({
      next: data => {
        this.historial = data;
        this.loading = false;
      },
      error: err => {
        console.error('Error al obtener el historial', err);
        this.loading = false;
        this.error = true;
      }
    });
  }

  get historialFiltrado(): any[] {
    if (!this.searchTerm) return this.historial;
    const term = this.searchTerm.toLowerCase();
    return this.historial.filter(item =>
      (item.Nombre_Completo + ' ' + item.Contenido_documento + ' ' + item.Evento)
        .toLowerCase()
        .includes(term)
    );
  }

  // Abrir modal para nuevo registro
  abrirModalNuevo() {
    this.esEdicion = false;
    this.registroActual = {};
    this.mostrarModal = true;
  }

  // Cerrar modal
  cerrarModal() {
    this.mostrarModal = false;
  }

  // Guardar nuevo o editar
  guardarRegistro() {
    if (this.esEdicion) {
      this.miServicio.put(`Historial/${this.registroActual.Id_Historial}`, this.registroActual).subscribe(() => {
        this.getHistorial();
        this.cerrarModal();
      });
    } else {
      this.miServicio.post('Historial', this.registroActual).subscribe(() => {
        this.getHistorial();
        this.cerrarModal();
      });
    }
  }

  // Editar registro
  editarRegistro(registro: any) {
    this.esEdicion = true;
    this.registroActual = { ...registro };
    this.mostrarModal = true;
  }

  // Eliminar registro
  eliminarRegistro(id: number) {
    if (confirm('¿Estás seguro de eliminar este registro?')) {
      this.miServicio.delete(`Historial/${id}`).subscribe(() => {
        this.getHistorial();
      });
    }
  }
}