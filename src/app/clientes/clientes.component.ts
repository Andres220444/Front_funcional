import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getClientes();
  }

  getClientes(): void {
    this.http.get<any[]>('http://localhost:3000/clientes').subscribe({
      next: data => {
        this.clientes = data;
        this.loading = false;
      },
      error: err => {
        console.error('Error al obtener los clientes', err);
        this.loading = false;
        this.error = true;
      }
    });
  }

  get clientesFiltrados(): any[] {
    if (!this.searchTerm) return this.clientes;
    const term = this.searchTerm.toLowerCase();
    return this.clientes.filter(cliente => {
      const nombreCompleto = `${cliente.Nombre1_Persona} ${cliente.Nombre2_Persona || ''} ${cliente.Apellido1_Persona} ${cliente.Apellido2_Persona || ''}`;
      return nombreCompleto.toLowerCase().includes(term);
    });
  }
}
