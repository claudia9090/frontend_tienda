import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { CarritoService } from '../servicios/carrito.service';
import { ID_USUARIO, NOMBRE_ROL } from '../shared/user';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environments';

@Component({
  selector: 'app-carrito-compra',
  templateUrl: './carrito-compra.component.html',
  styleUrls: ['./carrito-compra.component.css'],
})
export class CarritoCompraComponent implements OnInit {
  nombreRol = NOMBRE_ROL;
  idusuario = ID_USUARIO;

  listaProductosCarrito: any = [];

  totalOrden: number = 0;

  formulario: UntypedFormGroup;

  fechaMinima = new Date().toISOString().split('T')[0];

  tarjeta: string ='';
  vencimiento: string ='';
  cvc: string ='';
  titular: string ='';

  constructor(
    private carritoService: CarritoService,
    private router: Router,
    private form: UntypedFormBuilder,

    ) {
      this.formulario = this.form.group({
        // tarjeta: ['',[Validators.required, Validators.pattern('^[0-9]{12}$')]],
        // tarjeta: ['',[Validators.required, Validators.pattern('^(?:\d[ -]*?){12}$')]],
        tarjeta: ['',[Validators.required]],
        vencimiento: ['',[Validators.required,Validators.minLength(3),Validators.maxLength(15)]],
        cvc: ['',[Validators.required, Validators.pattern('^[0-9]{3}$') ]],
        titular: ['',[Validators.required,Validators.minLength(5),Validators.maxLength(99)]],
      });
    }

  ngOnInit() {
    this.productosCarrito();
  }

  productosCarrito() {
    let payload = {
      idusuario: this.idusuario,
    };
    this.carritoService.productosCarrito(payload).subscribe(
      async (data) => {
        if (data.message === 'OK') {
          this.listaProductosCarrito = data.data.map((item: any) => {
            return {
              ...item, 
              imagen: `${environment.imagenesProductos}${item.imagen}`
            }
          })

          if (this.listaProductosCarrito.length > 0) {
            this.totalOrden = this.listaProductosCarrito[0].totalOrden;
          } else {
            this.totalOrden = 0;
          }
        }
      },
      (err) => {
        console.log(err);
        Swal.fire({
          icon: 'info',
          title: 'Error',
          html: '<h5>Error listando los productos del carrito</h5>',
          confirmButtonText: 'Aceptar',
        });
      }
    );
  }

  eliminarProductoCarrito(item: any) {
    let payload = {
      idorden: item.idorden,
      id_detalle_orden: item.id_detalle_orden,
    };
    this.carritoService.eliminarProductoCarrito(payload).subscribe(
      async (data) => {
        if (data.message === 'OK') {
          this.carritoService.setCantidadProductosCar(
            data.data.cantidadProductos
          );
          this.productosCarrito();
        }
      },
      (err) => {
        console.log(err);
        Swal.fire({
          icon: 'info',
          title: 'Error',
          html: '<h5>Error eliminando producto del carrito</h5>',
          confirmButtonText: 'Aceptar',
        });
      }
    );
  }

  pagarOrden() {
    try {
      let payload = {
        idusuario: this.idusuario,
      };
      this.carritoService.pagarOrden(payload).subscribe(async (data) => {
        if (data.message === 'OK') {
          Swal.fire({
            icon: 'success',
            title: 'Pago realizado',
            html: '<h4>Se ha realizado el pago de la orden</h4>',
            confirmButtonText: 'Aceptar',
          }).then((result) => {
            window.location.reload();            
          });
          this.router.navigate(['/home']);
        }else{
          Swal.fire({
            icon: 'error',
            title: 'Error',
            html: '<h4>Se ha presentado un error en el pago</h4>',
            confirmButtonText: 'Aceptar',
          })
        }
      });
    } catch (error) {
      console.log(error);
    }
  }
}
