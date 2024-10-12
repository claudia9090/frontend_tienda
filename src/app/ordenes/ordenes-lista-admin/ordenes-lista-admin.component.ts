import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { OrdenesService } from 'src/app/servicios/ordenes.service';
import { environment } from 'src/environments/environments';
import { ProductosService } from 'src/app/servicios/productos.service';
import {BlockUI, NgBlockUI} from 'ng-block-ui'

@Component({
  selector: 'app-ordenes-lista-admin',
  templateUrl: './ordenes-lista-admin.component.html',
  styleUrls: ['./ordenes-lista-admin.component.css']
})
export class OrdenesListaAdminComponent {

  @BlockUI()
  blockUI: NgBlockUI | undefined;

  listaOrdenes: any = [];
  listaEstadosOrden: any = [];

  listaProductos: any = [];

  pageNow = 0;

  constructor(private ordenesService: OrdenesService,
              private productosService: ProductosService,
              private router: Router){}

  ngOnInit() {
    this.getlistaEstadosOrden();
    this.getlistaOrdenes();
  }

  actualizar(){
    this.ngOnInit();
  }

  getlistaEstadosOrden(){
    try{
      this.ordenesService.listaEstadosOrden().subscribe(async data =>{
        if(data.message == 'OK'){
          let lista = data.data.map((item: any) => item.nombre)

          let objeto: any = { };

          lista.forEach( (item: any) =>   {objeto[item]= item})

          this.listaEstadosOrden = objeto
        }
      })
    }
    catch(error){
      console.log(error);
    }

  }

  getlistaOrdenes(){
    try{
      this.ordenesService.listaOrdenesAdmin().subscribe(async data =>{
        if(data.message == 'OK'){
          this.listaOrdenes = data.data;
        }
      })
    } catch(error){
      console.log(error);
    }
  }

  actualizarOrden(id: any){
    try{
      Swal.fire({
        icon: 'info',
        title: `Actualizar estado de la orden ${id}`,
        input: "select",
        inputOptions: this.listaEstadosOrden,
        confirmButtonText: "Si",
        cancelButtonText: "No",
        showCancelButton: true,
        showCloseButton: true,
        preConfirm: async (select) => {
          
          let data = {
            idOrden : id,
            nombreEstado: select
          }

          this.ordenesService.actualizarEstado(data).subscribe(async data =>{
            if(data.message == 'OK'){
              this.ngOnInit();
            }
          })

        }
      })
  } catch(error){
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
