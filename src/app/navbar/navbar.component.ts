import { UtilsService } from './../servicios/utils.service';
import { OrdenesService } from './../servicios/ordenes.service';
import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { UsuariosService } from '../servicios/usuarios.service';
import Swal from 'sweetalert2';
import { NavigationEnd, Router } from '@angular/router';
import { NOMBRE_ROL, NOMBRE_USUARIO, ID_USUARIO } from '../shared/user';
import { CarritoService } from '../servicios/carrito.service';
import { environment } from 'src/environments/environments';
import { ProductosService } from '../servicios/productos.service';
import {BlockUI, NgBlockUI} from 'ng-block-ui'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {

  @BlockUI()
  blockUI: NgBlockUI | undefined;

  formLogin: UntypedFormGroup;
  formRecuperarPassword: UntypedFormGroup;
  formActualizarPassword: UntypedFormGroup;
  formSearch: UntypedFormGroup;

  showModalLogin: boolean = false;
  email: string = '';
  password: string = '';

  nombreUsuario = NOMBRE_USUARIO;
  nombreRol = NOMBRE_ROL;
  idusuario = ID_USUARIO;

  cantidadProductosCar = 0;

  currentDate : Date = new Date();

  ocultarBusqueda : boolean = false

  constructor(
    private usuarioService: UsuariosService,
    private ordenesService: OrdenesService,
    private formL: UntypedFormBuilder,
    private formPassWord: UntypedFormBuilder,
    private formUpdatePassWord: UntypedFormBuilder,
    private router: Router,
    private utilsService: UtilsService,
    private carritoService: CarritoService,
    private productoService: ProductosService,
  ) {
    
    router.events.subscribe((val) => {
      console.log('ruta: ', val);
      if(val instanceof NavigationEnd){
        if(val.url == '/home'){
          this.ocultarBusqueda = true;
        }else{
          this.ocultarBusqueda = false;
        }
      }
    })

    this.formLogin = this.formL.group({
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(1)]],
    });

    this.formRecuperarPassword = this.formPassWord.group({
      email: ['', Validators.required],
    });

    this.formActualizarPassword = this.formUpdatePassWord.group({
      passwordOld: ['', Validators.required],
      password: ['', Validators.required],
    });

    this.formSearch = this.formL.group({
      search: [''],
    });

  }

  ngOnInit(){

    if(this.nombreRol == 'CLIENTE'){
      this.cantidadProductosCarrito();
    }

    this.utilsService.dateObs.subscribe(currentDate => {
      this.currentDate = currentDate;
    })

    this.carritoService.getCantidadProductosCar.subscribe(items => {
      this.cantidadProductosCar = items;
    })

  }

  iniciarSesion(event: Event) {

    if (this.formLogin.valid) {
      document.getElementById("closeModal")?.click();
      
      let payload = {
        email: this.formLogin.value.email,
        password: this.formLogin.value.password,
      };
      this.usuarioService.login(payload).subscribe(
        async (data) => {
          if (data.message === 'OK') {
            if (data.data.nombreRol) {
              Swal.fire({
                icon: 'success',
                title: 'Login Success',
                html: '<h5>Login Success</h5>',
                confirmButtonText: 'Aceptar',
              }).then((result) => {
                localStorage.setItem('DATAUSER', JSON.stringify(data.data))
                this.router.navigate(['/home']).then(res => {
                  window.location.reload();
                })
              });
            }
          } else {
            Swal.fire({
              icon: 'info',
              title: 'Error',
              html: '<h5>Intente ingresar nuevamente</h5>',
              confirmButtonText: 'Aceptar',
            });
          }
        },
        (err) => {
          console.log(err);
          Swal.fire({
            icon: 'info',
            title: 'Error',
            html: '<h5>Verificar email o contraseña</h5>',
            confirmButtonText: 'Aceptar',
          });
        }
      );
    }
  }

  cerrarModal() {
    document.getElementById("closeModal")?.click();
  }

  cerrarSesion(){
    this.usuarioService.logout();
  }

  cantidadProductosCarrito() {
    
    let payload = {
        idusuario: this.idusuario
      };
      this.ordenesService.cantidadProductosCarrito(payload).subscribe(
        async (data) => {
          if (data.message === 'OK') {
            this.cantidadProductosCar = data.data.cantidadProductos;
          }
        },
        (err) => {
          console.log(err);
          Swal.fire({
            icon: 'info',
            title: 'Error',
            html: '<h5>Error carrito de compras</h5>',
            confirmButtonText: 'Aceptar',
          });
        }
      );
  }

  recuperarPassword(event: Event) {

    if (this.formRecuperarPassword.valid) {
      document.getElementById("closeModalRecuperarPassword")?.click();
      
      let payload = {
        email: this.formRecuperarPassword.value.email,
      };
      this.usuarioService.recuperarPassword(payload).subscribe(
        async (data) => {
          if (data.message === 'OK') {
              Swal.fire({
                icon: 'success',
                title: 'Recuperacion de contraseña exitosa',
                html: '<h5>Se ha enviado su nueva contraseña</h5>',
                confirmButtonText: 'Aceptar',
              }).then((result) => {
                this.router.navigate(['/home']);
              });
          } else {
            Swal.fire({
              icon: 'info',
              title: 'Error',
              html: '<h5>Intente ingresar nuevamente</h5>',
              confirmButtonText: 'Aceptar',
            });
          }
        },
        (err) => {
          console.log(err);
          Swal.fire({
            icon: 'info',
            title: 'Error',
            html: `<h5>${err.error.message}</h5>`,
            confirmButtonText: 'Aceptar',
          });
        }
      );
    }
  }

  actualizarPassword() {

    if (this.formActualizarPassword.valid) {
      document.getElementById("closeModalUpdatePassword")?.click();


      let payload = {
        iduser: this.idusuario,
        passwordOld: this.formActualizarPassword.value.passwordOld,
        password: this.formActualizarPassword.value.password
      };
      this.usuarioService.actualizarPassword(payload).subscribe(
        async (data) => {
          if (data.message === 'OK') {
            Swal.fire({
              icon: 'success',
              title: 'Actualización de contraseña',
              html: '<h5>Actualización de contraseña exitosa</h5>',
              confirmButtonText: 'Aceptar',
            }).then((result) => {
              this.router.navigate(['/home']);
            });
          } else {
            Swal.fire({
              icon: 'info',
              title: 'Error',
              html: '<h5>Intente ingresar nuevamente</h5>',
              confirmButtonText: 'Aceptar',
            });
          }
        },
        (err) => {
          console.log(err);
          Swal.fire({
            icon: 'info',
            title: 'Error',
            html: `<h5>${err.error.message}</h5>`,
            confirmButtonText: 'Aceptar',
          });
        }
      );
      
      this.formActualizarPassword.reset();
      
    }
  }

  listaProductos(nombreRol: any){
    try{
      this.blockUI?.start('Cargando...')
      this.productoService.listaProductos(nombreRol).subscribe(async productos =>{
        let arrayProd = productos.map((item: any) => {
          return {
            ...item,
            imagen: `${environment.imagenesProductos}${item.imagen}`
          }
        })
        this.productoService.setProductos(arrayProd);
        this.blockUI?.stop();
      })
    }
    catch(error){
      this.blockUI?.stop();
      console.log(error);
    }
  }

  listaProductosByBusqueda(){
    try{
      this.blockUI?.start('Cargando...')
      let parametros = {
        busqueda: this.formSearch.value.search,
        nombreRol: this.nombreRol
      }

      this.productoService.listaProductosByBusqueda(parametros).subscribe(async productos =>{
        let arrayProd = productos.map((item: any) => {
          return {
            ...item,
            imagen: `${environment.imagenesProductos}${item.imagen}`
          }
        })
        this.productoService.setProductos(arrayProd);
        this.blockUI?.stop();
      })
    }
    catch(error){
      this.blockUI?.stop();
      console.log(error);
    }
  }

}