import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';

// Librerías necesarias
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Componentes
import { AppComponent } from './app.component';
import { CatalogoUniComponent } from './catalogo-uni/catalogo-uni.component';
import { MenuInicioComponent } from './menu-inicio/menu-inicio.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

// Servicio
import { MiservicioService } from './miservicio.service';

// Definir rutas
const appRoutes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Inicia en login
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'Inicio', component: MenuInicioComponent },
  { path: 'catalogo_universal', component: CatalogoUniComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    CatalogoUniComponent,
    MenuInicioComponent,
    LoginComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [MiservicioService],
  bootstrap: [AppComponent]
})
export class AppModule { }
