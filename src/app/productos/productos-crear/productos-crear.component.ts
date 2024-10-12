import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ProductosService } from 'src/app/servicios/productos.service';
import { CategoriasService } from 'src/app/servicios/categorias.service';


@Component({
  selector: 'app-productos-crear',
  templateUrl: './productos-crear.component.html',
  styleUrls: ['./productos-crear.component.css']
})
export class ProductosCrearComponent implements OnInit {
  
  formCrearProducto: UntypedFormGroup;

  nombre: string = '';
  descripcion: string = '';
  precio: number = 0;
  stock: number = 0;
  idcategoria: number = 0;
  file?: File;

  categorias = [];

  constructor(
    private form: UntypedFormBuilder,
    private productosService: ProductosService,
    private categoriaService: CategoriasService,
    private router: Router
  ) {
    this.formCrearProducto = this.form.group({
      nombre: ['',[Validators.required,Validators.minLength(3),Validators.maxLength(50)]],
      descripcion: ['',[Validators.required,Validators.minLength(5),Validators.maxLength(10000)]],
      precio: ['',[Validators.required,Validators.min(1),Validators.max(100000000)]],
      stock: ['',[Validators.required,Validators.min(1),Validators.max(1000000)]],
      idcategoria: ['',[Validators.required]],

    });
  }

  ngOnInit() {
    this.listaCategorias();
  }

  listaCategorias(){
    try{
      this.categoriaService.listaCategorias().subscribe(async categorias =>{
        this.categorias = categorias.data;
      })
    }
    catch(error){
      console.log(error);
    }

  }

  agregarImagen(event: any){    
    this.file = event.target.files[0];
    if (this.file!.type.indexOf('image') < 0) {
      Swal.fire({
        icon: 'info',
        title: 'Error',
        html: '<h4>El archivo debe ser del tipo imagen</h4>',
        confirmButtonText: 'Aceptar',
      });
    }
  }

  crearProducto() {
    if (!this.file) {
      Swal.fire({
        icon: 'info',
        title: 'Error',
        html: '<h4>Debe seleccionar una imagen</h4>',
        confirmButtonText: 'Aceptar',
      });
    }

    if (this.formCrearProducto.valid) {
      let payload = {
        nombre: this.formCrearProducto.value.nombre,
        descripcion: this.formCrearProducto.value.descripcion,
        precio: this.formCrearProducto.value.precio,
        stock: this.formCrearProducto.value.stock,
        idcategoria: this.formCrearProducto.value.idcategoria.id,
      };

      this.productosService.crearProducto(payload, this.file!).subscribe(
        async (data) => {
          if (data.message === 'OK') {
              Swal.fire({
                icon: 'success',
                title: 'Producto Creado',
                html: '<h5>Creación de producto exitoso</h5>',
                confirmButtonText: 'Aceptar',
              }).then((result) => {
                this.router.navigate(['/home']);
              });
          } else {
            Swal.fire({
              icon: 'info',
              title: 'Error',
              html: '<h5>Intente nuevamente</h5>',
              confirmButtonText: 'Aceptar',
            });
          }
        },
        (err) => {
          console.log(err);
          Swal.fire({
            icon: 'info',
            title: 'Error',
            html: '<h5>Ocurrio un error intente nuevamente</h5>',
            confirmButtonText: 'Aceptar',
          });
        }
      );
    }
  }
}
