import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-documentos',
  templateUrl: './documentos.component.html',
  styleUrls: ['./documentos.component.css']
})
export class DocumentosComponent implements OnInit {
  documentos: any[] = [];
  documentoSeleccionado: any = null;

  // UI states
  busqueda: string = '';
  filtroEstado: string = '';
  paginaActual: number = 1;
  documentosPorPagina: number = 6;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any[]>('http://localhost:3000/Documentos').subscribe({
      next: (data) => this.documentos = data,
      error: (error) => console.error('Error fetching documents:', error)
    });
  }

  verContenido(doc: any) {
    this.documentoSeleccionado = doc;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  trackById(index: number, item: any): number {
    return item.id_documento;
  }

  get documentosFiltrados() {
    return this.documentos.filter(doc =>
      (!this.busqueda || 
       doc.Nombre_Cliente.toLowerCase().includes(this.busqueda.toLowerCase()) || 
       doc.Tipo_Documento.toLowerCase().includes(this.busqueda.toLowerCase())) &&
      (!this.filtroEstado || doc.Estado_Documento === this.filtroEstado)
    );
  }

  get documentosPaginados() {
    const start = (this.paginaActual - 1) * this.documentosPorPagina;
    return this.documentosFiltrados.slice(start, start + this.documentosPorPagina);
  }

  totalPaginas(): number {
    return Math.ceil(this.documentosFiltrados.length / this.documentosPorPagina);
  }
}
