import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MiservicioService } from '../miservicio.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupForm: FormGroup;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private servicio: MiservicioService, private router: Router) {
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.signupForm.valid) {
      this.servicio.register(this.signupForm.value).subscribe({
        next: (response) => {
          console.log('Registro exitoso', response);
          alert('Usuario registrado correctamente');
          this.router.navigate(['/login']); // Redirige a login después del registro
        },
        error: (error) => {
          console.error('Error en el registro', error);
          this.errorMessage = 'No se pudo registrar el usuario';
        }
      });
    }
  }

  goToLogin() {
    this.router.navigate(['/login']); // Navegación a login
  }
}
