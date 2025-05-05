import { Component } from '@angular/core';

@Component({
  selector: 'app-menu-inicio',
  templateUrl: './menu-inicio.component.html',
  styleUrls: ['./menu-inicio.component.css']
})
export class MenuInicioComponent {
  infoText: string | null = null;

  showInfo(type: string) {
    if (type === 'mision') {
      this.infoText = "Brindar bienestar y mejorar la calidad de vida de nuestros grupos de interés, poniendo a disposición de los pacientes, médicos, droguistas y distribuidores medicamentos y cosméticos con valor agregado, calidad certificada y a un precio asequible. Igualmente permitir el desarrollo personal y profesional de nuestros colaboradores en la compañía, facilitando su proceso formativo y crecimiento profesional, logrando generar valor para la organización, colaboradores, socios de negocio, comunidad y accionistas.";
    } else if (type === 'vision') {
      this.infoText = "En el año 2025 ser el laboratorio farmacéutico nacional con mayor crecimiento en el mercado. Consolidando un portafolio con productos de excelente calidad y de alto valor agregado para nuestros clientes, desarrollando productos internamente como también estableciendo alianzas con terceros a nivel nacional e internacional. Consolidar una organización dinámica y estandarizada en sus procesos permitiendo un crecimiento ordenado y sostenible a través de la mejora continua con un grupo humano calificado y comprometido. Logrando mejorar la competitividad y la rentabilidad de la organización para impactar de manera favorable a todos sus grupos de interés.";
    }
  }

  hideInfo() {
    this.infoText = null;
  }
}
