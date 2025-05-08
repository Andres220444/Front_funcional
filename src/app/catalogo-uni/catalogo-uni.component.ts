import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar'; // Añade esta importación


import { MiservicioService } from '../miservicio.service';

@Component({
  selector: 'app-catalogo-uni',
  templateUrl: './catalogo-uni.component.html',
  styleUrl: './catalogo-uni.component.css'
})
export class CatalogoUniComponent {
  constructor(
    private formBuilder: FormBuilder,
    private servi: MiservicioService,
    private router: Router,
    public snackBar: MatSnackBar // Inyecta el SnackBar
  ) { }

  //------------------------------------------------------------
  //LAS VARIABLES 
  loading: boolean = false; // Añade esta línea al inicio de tu clase
  title = "MANEJO DE CATALOGO UNIVERSAL";    //Titulo dela página

  tituloCataUniLista = "";              //Titulo Lista de todos los catalogos
  titloCataUniBuscado = "";             //Titulo de Color Buscado
  titloCataUniEditar = "";              //Titulo de Color a Editar

  CataUniT: any = [];                   //Lista de todos los catalogos
  CataUniCatalogo: any = [];            //Lista catalogo Catalogo
  CataUniColor: any = [];               //Lista catalogo Color
  CataUniTipVehi: any = [];             //Lista catalogo TiposVehiculos
  CataUniMarca: any = [];               //Lista catalogo Marca
  CataUniTipDoc: any = [];              //Lista catalogo Tipos de Documntos
  CataUniEps: any = [];                 //Lista catalogo Eps
  CataUniPrefSexual: any = [];          //Lista catalogo Preferencias Sexuales

  CataUniCatalogoSel: any = [];         //Lista catalogo Catalogo selecionado
  CataUniColorSel: any = [];           //Lista el color selecionado
  CataUniTipVehiSel: any = [];         //Lista catalogo TiposVehiculos selecionado
  CataUniMarcaSel: any = [];           //Lista catalogo Marca selecionado
  CataUniTipDocSel: any = [];          //Lista catalogo Tipos de Documntos selecionado
  CataUniEpsSel: any = [];             //Lista catalogo Eps selecionado
  CataUniPrefSexualSel: any = [];      //Lista catalogo Preferencias Sexuales selecionado
  CataUniCataEdi: any[] = [];             // Registro del catalogo a editar

  tablacatalogosstotales: any = [];          //Encabezados tabla catalogos totales

  BuscarEvalor = 1;               //Control para carga del valor a buscar
  controlLista = 1;               //Control para limpiar la lista


  //*****************************************************************************
  //Form group  //Grupo para la lista de Colores
  ListarCatTotales = new FormGroup
    (
      {

      }
    );

  //Grupo para formulariomostrar catalogo de Catalogos
  CBCatalogoCatalogo = new FormGroup
    (
      {
        CatCatalogofiltro: new FormControl(),
        textCatalogo: new FormControl()
      }
    );

  //Grupo para formulariomostrar catalogo colores
  CBCatalogoColor = new FormGroup
    (
      {
        CatColorfiltro: new FormControl(),
        textColor: new FormControl()
      }
    );

  //Grupo para formulariomostrar catalogo Tipos de Vehículos
  CBCatalogoTipVehi = new FormGroup
    (
      {
        CatTipVehifiltro: new FormControl(),
        textTivVehi: new FormControl()
      }
    );

  //Grupo para formulariomostrar catalogo Marca
  CBCatalogoMarca = new FormGroup
    (
      {
        CatMarcafiltro: new FormControl(),
        textMarca: new FormControl()
      }
    );

  //Grupo para formulariomostrar catalogo Tipos de Documentos
  CBCatalogoTipDoc = new FormGroup
    (
      {
        CatTipDocfiltro: new FormControl(),
        textTivDoc: new FormControl()
      }
    );

  //Grupo para formulariomostrar catalogo EPS
  CBCatalogoEps = new FormGroup
    (
      {
        CatEpsfiltro: new FormControl(),
        textEps: new FormControl()
      }
    );

  //Grupo para formulariomostrar catalogo PrefSexual
  CBCatalogoPrefSexual = new FormGroup
    (
      {
        CatPrefSexualfiltro: new FormControl(),
        textPrefSexual: new FormControl()
      }
    );

  //Grupo para crear Catalogos
  CrearCatalogoU = new FormGroup
    (
      {
        CBTipoCatalogo: new FormControl(),
        textNueDenominacion: new FormControl(),
        textNueTipoCat: new FormControl(),
      }
    );

  //Grupo para editar Catalogos
  ActCatalogoU = new FormGroup
    (
      {
        CBCatalogoEdi: new FormControl(),
        CBTipoCatalogoEdi: new FormControl(),
        textNueDenominacionEdi: new FormControl(),
        textNueTipoCatEdi: new FormControl(),
      }
    );

  //=============================================================
  //LOS CRUD
  //=============================================================
  //Lista de todos los catalogos

  public consultaCatalogosTotales() {
    if (this.controlLista == 1) {
      this.servi.getCatalogoTotal().subscribe((data: { catalogouiversal: [] }) => {

        this.CataUniT = data;  //JSON.parse(data);
        this.tituloCataUniLista = "LISTA DE TODOS LOS CATALOGOS";
        this.tablacatalogosstotales[0] = "Codigo";
        this.tablacatalogosstotales[1] = "Nombre";
        this.tablacatalogosstotales[2] = "Categoría";
      },
        error => { console.error(error + " ") });
    }
    else {
      this.CataUniT = null;
      this.tituloCataUniLista = "";
      this.tablacatalogosstotales[0] = "";
      this.tablacatalogosstotales[1] = "";
      this.tablacatalogosstotales[2] = "";
      this.controlLista = 1;
    }

  }

  //--------------------------------------------------------------------------------------------->
  //para Limpiar la lista

  public LimpiarLista() {
    this.controlLista = 0;
  }

  // -----------------------------------------------------------------------------------------
  // Listar un solo tipo de Catalogo
  //--------------------------------------------------------------
  //Consulta un color por medio de su id.

  public ListarCatalogoE(catip: any) {

    this.servi.getlListCatologoEsp('/' + catip).subscribe((data: {}) => {
      if (catip == 1) {
        this.CataUniCatalogo = data;
      }
      else if (catip == 2) {
        this.CataUniColor = data;
      }
      else if (catip == 3) {
        this.CataUniTipVehi = data;
      }
      else if (catip == 4) {
        this.CataUniMarca = data;
      }
      else if (catip == 5) {
        this.CataUniTipDoc = data;
      }
      else if (catip == 6) {
        this.CataUniEps = data;
      }
      else //if(catip == 7)
      {
        this.CataUniPrefSexual = data;
      }

    },
      error => { console.log(error) });

  }


  //--------------------------------------------------------------
  //Consulta un color por medio de su id.

  public SelecCatalogoE(catip: any, catselec: any) {

    if (this.BuscarEvalor != 0) {
      if (catip == 1) {
        this.BuscarEvalor = this.CBCatalogoCatalogo.getRawValue()['CatCatalogofiltro'];
      }
      else if (catip == 2) {
        this.BuscarEvalor = this.CBCatalogoColor.getRawValue()['CatColorfiltro'];
      }
      else if (catip == 3) {
        this.BuscarEvalor = this.CBCatalogoTipVehi.getRawValue()['CatTipVehifiltro'];
      }
      else if (catip == 4) {
        this.BuscarEvalor = this.CBCatalogoMarca.getRawValue()['CatMarcafiltro'];
      }
      else if (catip == 5) {
        this.BuscarEvalor = this.CBCatalogoTipDoc.getRawValue()['CatTipDocfiltro'];
      }
      else if (catip == 6) {
        this.BuscarEvalor = this.CBCatalogoEps.getRawValue()['CatEpsfiltro'];
      }
      else //if(catip ==7)
      {
        this.BuscarEvalor = this.CBCatalogoPrefSexual.getRawValue()['CatPrefSexualfiltro'];
      }

    }
    catselec = this.BuscarEvalor;


    this.servi.getlListCatologoEsp('/' + catip + '/' + catselec).subscribe((data: {}) => {
      console.log(" aca universal 12  catip - " + catip + "  Catselec  - " + catselec);
      if (catip == 1) {
        this.CataUniCatalogoSel = data;
      }
      else if (catip == 2) {
        this.CataUniColorSel = data;
      }
      else if (catip == 3) {
        this.CataUniTipVehiSel = data;
      }
      else if (catip == 4) {
        this.CataUniMarcaSel = data;
      }
      else if (catip == 5) {
        this.CataUniTipDocSel = data;
      }
      else if (catip == 6) {
        this.CataUniEpsSel = data;
      }
      else //if(catip == 7)
      {
        this.CataUniPrefSexualSel = data;
      }


    },
      error => { console.log(error) });

  }

  //--------------------------------------------------------------
  //Consulta un catalogo por Id.

  public SelCataEditar() {
    this.BuscarEvalor = this.ActCatalogoU.getRawValue()['CBCatalogoEdi'];

    this.servi.getlCatEdit(this.BuscarEvalor).subscribe((data: any) => {

      this.CataUniCataEdi = data;
      //console.log(" aca 45 " + this.CataUniCataEdi.length + " y la data  " + data.length);
      this.titloCataUniEditar = "CATALOGO A EDITAR";

    },
      error => { console.log(error) });


  }

  //-------------------------------------------------------------------------
  //Para insertar una nuevo catalogo

  nuevoCatalogo = {
    Tipo_Catalogo: null,
    Denominacion_Catalogo: ''
  };
  // catalogo-uni.component.ts

  // Lista de tipos de catálogo válidos (ajusta según tu backend)
  readonly TIPOS_CATALOGO_VALIDOS = [1, 2, 3, 4, 5, 6, 7];

  crearCatalogo() {
    // Validación del tipo de catálogo
    if (!this.TIPOS_CATALOGO_VALIDOS.includes(Number(this.nuevoCatalogo.Tipo_Catalogo))) {
      this.snackBar.open('❌ Tipo de catálogo inválido. Por favor seleccione un tipo válido', 'Cerrar', {
        duration: 5000,
        panelClass: ['error-snackbar']
      });
      return;
    }

    // Validación de la denominación
    if (!this.nuevoCatalogo.Denominacion_Catalogo || this.nuevoCatalogo.Denominacion_Catalogo.trim().length < 3) {
      this.snackBar.open('❌ La denominación debe tener al menos 3 caracteres', 'Cerrar', {
        duration: 5000,
        panelClass: ['error-snackbar']
      });
      return;
    }

    this.loading = true;

    this.servi.insertarNuevoCatalogo(this.nuevoCatalogo).subscribe({
      next: (res) => {
        this.snackBar.open('✅ Catálogo creado exitosamente', 'Cerrar', {
          duration: 3000,
          panelClass: ['success-snackbar']
        });
        this.resetFormulario();
      },
      error: (err) => {
        this.mostrarErrorPersonalizado(err);
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  private mostrarErrorPersonalizado(err: any) {
    let mensaje = 'Error al crear catálogo';

    if (err.status === 400) {
      mensaje = err.error?.message || 'Datos inválidos enviados al servidor';
    } else if (err.status === 409) {
      mensaje = 'El catálogo ya existe';
    } else if (err.status === 0) {
      mensaje = 'Error de conexión con el servidor';
    }

    this.snackBar.open(`❌ ${mensaje}`, 'Cerrar', {
      duration: 7000,
      panelClass: ['error-snackbar']
    });
  }

  private resetFormulario() {
    this.nuevoCatalogo = { Tipo_Catalogo: null, Denominacion_Catalogo: '' };
    this.loading = false;
  }


  // -----------------------------------------------------------------------------------------
  // método para actualizar un catalogo .
  public mensaje: string = '';
  public error: boolean = false;

  // -----------------------------------------------------------------------------------------
  // método para actualizar un catálogo.

  // ... (other variables and form groups remain unchanged)

  // Method to update a catalog
  public ActualizarCatalogo() {
      const datosvalo1 = this.ActCatalogoU.getRawValue()['CBCatalogoEdi'];
      const datosvalo2 = this.ActCatalogoU.getRawValue()['textNueDenominacionEdi'];
      const datosvalo3 = this.ActCatalogoU.getRawValue()['textNueTipoCatEdi'];
    
      if (!datosvalo1 || !datosvalo2 || !datosvalo3) {
        this.snackBar.open('❌ Todos los campos son obligatorios para actualizar.', 'Cerrar', {
          duration: 4000,
          panelClass: ['error-snackbar']
        });
        return;
      }
    
      const cadena = {
        id_Catalogo: datosvalo1,
        Denominacion_Catalogo: datosvalo2,
        Tipo_Catalogo: datosvalo3
      };
    
      this.servi.ActualizarCatalogoU(cadena).then(res => {
        this.snackBar.open('✅ ' + (res.msg || 'Catálogo actualizado con éxito'), 'Cerrar', {
          duration: 3000,
          panelClass: ['success-snackbar']
        });
        this.error = false;
        this.ActCatalogoU.reset();
      }).catch(err => {
        const mensaje = err?.error?.msg || 'Ocurrió un error al actualizar.';
        this.snackBar.open('❌ ' + mensaje, 'Cerrar', {
          duration: 5000,
          panelClass: ['error-snackbar']
        });
        this.error = true;
      });
    }
    



  //=============================================================
  //LAS FUNCIONES PARA LLAMARLAS DESDE EL HTML
  //=============================================================  

  ngOnInit(): void {

    this.ListarCatTotales = this.formBuilder.group(
      {

      });

    this.CBCatalogoCatalogo = this.formBuilder.group(
      {
        CatCatalogofiltro: [],
        textCatalogo: []
      });

    this.CBCatalogoColor = this.formBuilder.group(
      {
        CatColorfiltro: [],
        textColor: []
      });

    this.CBCatalogoTipVehi = this.formBuilder.group(
      {
        CatTipVehifiltro: [],
        textTivVehi: []
      });

    this.CBCatalogoMarca = this.formBuilder.group(
      {
        CatMarcafiltro: [],
        textMarca: []
      });

    this.CBCatalogoTipDoc = this.formBuilder.group(
      {
        CatTipDocfiltro: [],
        textTivDoc: []
      });

    this.CBCatalogoEps = this.formBuilder.group(
      {
        CatEpsfiltro: [],
        textEps: []
      });

    this.CBCatalogoPrefSexual = this.formBuilder.group(
      {
        CatPrefSexualfiltro: [],
        textPrefSexual: []
      });

    this.CrearCatalogoU = this.formBuilder.group(
      {
        CBTipoCatalogo: [],
        textNueDenominacion: [],
        textNueTipoCat: []
      });

    this.ActCatalogoU = this.formBuilder.group({
      CBCatalogoEdi: ['', Validators.required],
      CBTipoCatalogoEdi: [null], // Add this control
      textNueDenominacionEdi: ['', [Validators.required, Validators.minLength(3)]],
      textNueTipoCatEdi: ['', [Validators.required, Validators.min(1)]]
    });
    
  }
}
