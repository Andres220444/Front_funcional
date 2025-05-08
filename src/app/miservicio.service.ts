import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class MiservicioService {
  private Url: string = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  // Manejo de errores genérico
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  // Métodos de Catálogo Universal
  getCatalogoTotal(): Observable<any> {
    return this.http.get(`${this.Url}/Universal`, httpOptions)
      .pipe(catchError(this.handleError('getCatalogoTotal', [])));
  }

  getlListCatologoEsp(tipcat: any): Observable<any> {
    console.log('Tipo catálogo: ' + tipcat);
    return this.http.get(`${this.Url}/Universal/${tipcat}`, httpOptions)
      .pipe(catchError(this.handleError('getlListCatologoEsp', [])));
  }

  getlCatEspSelec(IdCat: any): Observable<any> {
    console.log("ID catálogo seleccionado: " + IdCat);
    return this.http.get(`${this.Url}/Universal/${IdCat}`, httpOptions)
      .pipe(catchError(this.handleError('getlCatEspSelec', {})));
  }

  getlCatEdit(Id: any): Observable<any> {
    return this.http.get(`${this.Url}/Universal/${Id}`, httpOptions)
      .pipe(catchError(this.handleError('getlCatEdit', {})));
  }
  private apiUrl = 'http://localhost:3000/Universal';

  insertarNuevoCatalogo(catalogo: any): Observable<any> {
    const url = `${this.apiUrl}`; // Asegúrate de que esta URL apunte al endpoint correcto
    return this.http.post(url, catalogo);
  }
  

  async ActualizarCatalogoU(Dato: any): Promise<any> {
    try {
      return await this.http.put(`${this.apiUrl}`, Dato, httpOptions).toPromise();
    } catch (error) {
      console.error("Error actualizando catálogo:", error);
      throw error;
    }
  }
  

  // Métodos de Autenticación
  register(userData: any): Observable<any> {
    return this.http.post(`${this.Url}/Users/register`, userData, httpOptions)
      .pipe(catchError(this.handleError('register')));
  }

  login(userData: any): Observable<any> {
    return this.http.post(`${this.Url}/Users/login`, userData, httpOptions)
      .pipe(catchError(this.handleError('login')));
  }

  getPersonas(): Observable<any> {
    return this.http.get(`${this.Url}/Personal`, httpOptions)
      .pipe(catchError(this.handleError('getPersonas', [])));
  }
  // ... (otros métodos ya existentes)
// En tu MiservicioService.ts

get(endpoint: string): Observable<any> {
  return this.http.get(`${this.Url}/${endpoint}`);
}

post(endpoint: string, body: any): Observable<any> {
  return this.http.post(`${this.Url}/${endpoint}`, body, httpOptions);
}

put(endpoint: string, body: any): Observable<any> {
  return this.http.put(`${this.Url}/${endpoint}`, body, httpOptions);
}

delete(endpoint: string): Observable<any> {
  return this.http.delete(`${this.Url}/${endpoint}`, httpOptions);
}

  

}