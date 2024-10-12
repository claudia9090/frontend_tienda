import { CarritoService } from './../../servicios/carrito.service';
import { OrdenesService } from './../../servicios/ordenes.service';
import { Component, Injectable } from '@angular/core';
import { ProductosService } from '../../servicios/productos.service';
import { CategoriasService } from '../../servicios/categorias.service';
import { ID_USUARIO, NOMBRE_ROL } from '../../shared/user'
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environments';
import {BlockUI, NgBlockUI} from 'ng-block-ui'

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-productos-lista',
  templateUrl: './productos-lista.component.html',
  styleUrls: ['./productos-lista.component.css']
})
export class ProductosListaComponent {

  @BlockUI()
  blockUI: NgBlockUI | undefined;

  nombreRol = NOMBRE_ROL;
  idusuario = ID_USUARIO;

  categorias : any = [];
  productos : any = [];

  constructor(
    private productoService: ProductosService,
    private categoriaService: CategoriasService,
    private ordenesService: OrdenesService,
    private carritoService: CarritoService
     ) {}

  ngOnInit() {
    this.listaCategorias();
    this.listaProductos(this.nombreRol);

    this.productoService.getProductos.subscribe(items => {
      this.productos = items;
    })

  }

  listaCategorias(){
    try{
      this.blockUI?.start('Cargando...')
      this.categoriaService.listaCategorias().subscribe(async categorias =>{
        if(categorias.message == 'OK'){
          this.categorias = categorias.data;
        }
      })
    this.blockUI?.stop();
    }
    catch(error){
      console.log(error);
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

  clickCategoria(idCategoria: any){
    try{
      this.blockUI?.start('Cargando...')
      let parametros = {
        idCategoria: idCategoria.id,
        nombreRol: this.nombreRol
      }

      this.productoService.listaProductosByCategoria(parametros).subscribe(async productos =>{
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

  agregarProductoCarrito(idproducto: any){
    try{
      let payload = {
        idusuario: this.idusuario,
        idproducto: idproducto
      }
      this.ordenesService.crearOrdenAgregarProducto(payload).subscribe(async data =>{
        if (data.message === 'OK') {
          this.carritoService.setCantidadProductosCar(data.data.cantidadProductos)
          Swal.fire({
            icon: 'success',
            title: 'Producto Agregado',
            html: '<h4>Producto agregado al carrito</h4>',
            confirmButtonText: 'Aceptar',
          })
      }
      })

    }
    catch(error){
      console.log(error);
    }
  }

}
