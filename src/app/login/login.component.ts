import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MiservicioService } from '../miservicio.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private servicio: MiservicioService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }
  onSubmit() {
    if (this.loginForm.valid) {
      this.servicio.login(this.loginForm.value).subscribe({
        next: (response: any) => {  // 👈 Agrega ": any" temporalmente para evitar errores de tipo
          console.log('Respuesta del backend:', response); // 🔍 Mira en la consola lo que devuelve
  
          // Verificar si la respuesta contiene user
          if (response && response.user) {
            if (response.user) {
              localStorage.setItem('user', JSON.stringify(response.user));
              this.router.navigate(['/Inicio']);
          } else {
              console.error('Usuario no encontrado en la respuesta');
          }
          
            alert('Inicio de sesión exitoso');
            this.router.navigate(['/Inicio']);
          } else {
            console.error('Estructura de respuesta incorrecta', response);
            this.errorMessage = 'Error en la respuesta del servidor';
          }
        },
        error: (error) => {
          console.error('Error en el inicio de sesión', error);
          this.errorMessage = error.error?.error || 'Correo o contraseña incorrectos';
        }
      });
    }
  }
  
}
