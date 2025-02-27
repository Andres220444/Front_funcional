import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class MiservicioService {
  private Url: string = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  private extractData(res: Response) {
    let body = JSON.parse('' + res);
    return body || {};
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  // Métodos de Catálogo Universal
  getCatalogoTotal(): Observable<any> {
    return this.http.get(this.Url + "/Universal", httpOptions);
  }

  getlListCatologoEsp(tipcat: any): Observable<any> {
    console.log('aca servi 25 --' + tipcat);
    return this.http.get(this.Url + "/Universal" + tipcat, httpOptions);
  }

  getlCatEspSelec(IdCat: any): Observable<any> {
    console.log(" aca 23  " + IdCat);
    return this.http.get(this.Url + "/Universal" + IdCat, httpOptions);
  }

  getlCatEdit(Id: any): Observable<any> {
    return this.http.get(this.Url + "/Universal" + Id, httpOptions);
  }

  async CrearCatalogoU(Dato: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post(this.Url + "/Universal", Dato, httpOptions).toPromise()
    });
  }

  async ActualizarCatalogoU(Dato: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.put(this.Url + "/Universal", Dato, httpOptions).toPromise()
    });
  }

  // Métodos de Autenticación
  register(userData: any): Observable<any> {
    return this.http.post(this.Url + "/Users/register", userData, httpOptions);
  }

  login(userData: any): Observable<any> {
    return this.http.post(`${this.Url}/Users/login`, userData, httpOptions);
  }
  
}
