import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';


// Componentes
import { AppComponent } from './app.component';
import { CatalogoUniComponent } from './catalogo-uni/catalogo-uni.component';
import { MenuInicioComponent } from './menu-inicio/menu-inicio.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { PersonasComponent } from './personas/personas.component';
import { DocumentosComponent } from './documentos/documentos.component';
import { ClientesComponent } from './clientes/clientes.component';
import { HistorialComponent } from './historial/historial.component';

// Servicios e interceptores
import { MiservicioService } from './miservicio.service';
import { ErrorInterceptor } from './error.interceptor';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

// Definir rutas
const appRoutes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'Inicio', component: MenuInicioComponent },
  { path: 'catalogo_universal', component: CatalogoUniComponent },
  { path: 'personas', component: PersonasComponent },
  { path: 'documentos', component: DocumentosComponent },
  { path: 'clientes', component: ClientesComponent },
  { path: 'historial', component: HistorialComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    CatalogoUniComponent,
    MenuInicioComponent,
    LoginComponent,
    SignupComponent,
    PersonasComponent,
    DocumentosComponent,
    ClientesComponent,
    HistorialComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatSnackBarModule, // Para las notificaciones

    // ✅ Nuevos módulos de Angular Material
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ],
  exports: [
    RouterModule],
  providers: [
    MiservicioService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    },
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }