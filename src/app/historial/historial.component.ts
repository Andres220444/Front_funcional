import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getHistorial();
  }

  getHistorial(): void {
    this.http.get<any[]>('http://localhost:3000/Historial').subscribe({
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
}
