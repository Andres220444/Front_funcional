import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { MenuInicioComponent } from './menu-inicio/menu-inicio.component';
import { CatalogoUniComponent } from './catalogo-uni/catalogo-uni.component';
import{ PersonasComponent } from './personas/personas.component';
import { DocumentosComponent } from './documentos/documentos.component';
import { ClientesComponent } from './clientes/clientes.component';
import { HistorialComponent } from './historial/historial.component';



const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Inicia en login
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'Inicio', component: MenuInicioComponent },
  { path: 'catalogo_universal', component: CatalogoUniComponent },
  {path: 'personas', component: PersonasComponent},
  {path: 'documentos', component: DocumentosComponent},
  {path: 'clientes', component: ClientesComponent },
  {path: 'historial', component: HistorialComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
