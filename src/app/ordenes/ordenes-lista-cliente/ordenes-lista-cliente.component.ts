import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { OrdenesService } from 'src/app/servicios/ordenes.service';
import { ID_USUARIO, NOMBRE_ROL } from '../../shared/user';
import { environment } from 'src/environments/environments';
import { ProductosService } from 'src/app/servicios/productos.service';
import {BlockUI, NgBlockUI} from 'ng-block-ui'

@Component({
  selector: 'app-ordenes-lista-cliente',
  templateUrl: './ordenes-lista-cliente.component.html',
  styleUrls: ['./ordenes-lista-cliente.component.css'],
})
export class OrdenesListaClienteComponent {

  @BlockUI()
  blockUI: NgBlockUI | undefined;

  idusuario = ID_USUARIO;

  listaOrdenes: any = [];

  listaProductos: any = [];

  pageNow = 0;

  constructor(private ordenesService: OrdenesService,
              private productosService: ProductosService,
              private router: Router) {}

  ngOnInit() {
    this.getlistaOrdenes(this.idusuario);
  }

  actualizar(){
    this.ngOnInit();
  }

  getlistaOrdenes(idusuario: any) {
    try {
      this.ordenesService
        .listaOrdenesCliente({ idusuario }).subscribe(async (data) => {
          if (data.message == 'OK') {
            this.listaOrdenes = data.data;
          }
        });
    } catch (error) {
      console.log(error);
    }
  }

  confirmarOrdenRecibida(idorden: any) {
    try {
      Swal.fire({
        icon: 'info',
        title: `confirmar recepcion de orden ${idorden}`,
        confirmButtonText: 'Si',
        cancelButtonText: 'No',
        showCancelButton: true,
        showCloseButton: true,
        preConfirm: async () => {
          this.ordenesService.confirmarOrdenRecibida({ idorden }).subscribe(async (data) => {
            if (data.message == 'OK') {
              this.ngOnInit();
            }
          });
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  listaProductorByOrden(idorden: any){
    try{
      this.blockUI?.start('Cargando...')
      let parametros = {
        idorden: idorden
      }

      this.productosService.listaProductosByOrdenId(parametros).subscribe(async productos =>{
        this.listaProductos = productos.map((item: any) => {
          return {
            ...item,
            imagen: `${environment.imagenesProductos}${item.imagen}`
          }
        })
        this.blockUI?.stop();
      })
    }
    catch(error){
      this.blockUI?.stop();
      console.log(error);
    }
  }
}
