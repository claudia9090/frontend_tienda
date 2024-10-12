import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductosService } from 'src/app/servicios/productos.service';
import { CategoriasService } from 'src/app/servicios/categorias.service';
import { environment } from 'src/environments/environments';


@Component({
  selector: 'app-productos-actualizar',
  templateUrl: './productos-actualizar.component.html',
  styleUrls: ['./productos-actualizar.component.css']
})
export class ProductosActualizarComponent {

  formCrearProducto: UntypedFormGroup;

  idProducto: any;

  nombre: string = '';
  descripcion: string = '';
  precio: number = 0;
  stock: number = 0;
  idcategoria: number = 0;
  file?: File;
  imagen : string = '';
  imagenPreview : any = null;

  categorias = [];


  listaEstados = [
    {id: 0, name: 'Inactivo'},
    {id: 1, name: 'Activo'},
  ];

  itemEstado: number = 0;

  constructor(
    private form: UntypedFormBuilder,
    private productosService: ProductosService,
    private categoriaService: CategoriasService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.formCrearProducto = this.form.group({
      nombre: ['',[Validators.required,Validators.minLength(3),Validators.maxLength(50)]],
      descripcion: ['',[Validators.required,Validators.minLength(5),Validators.maxLength(10000)]],
      precio: ['',[Validators.required,Validators.min(1),Validators.max(100000000)]],
      stock: ['',[Validators.required,Validators.min(1),Validators.max(1000000)]],
      itemEstado: ['', [Validators.required]],
      idcategoria: ['',[Validators.required]],

    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => this.idProducto = params.id);
    this.listaCategorias();
    this.getProducto();

  }

  listaCategorias(){
    try{
      this.categoriaService.listaCategorias().subscribe(async categorias =>{
        if(categorias.message == 'OK'){
          this.categorias = categorias.data;
        }
      })
    }
    catch(error){
      console.log(error);
    }

  }

  getProducto(){

    this.productosService.getProducto(this.idProducto).subscribe(
      async (data) => {
        if (data.message === 'OK') {
          
          this.nombre = data.data.nombre;
          this.descripcion = data.data.descripcion;
          this.precio = data.data.precio;
          this.stock = data.data.stock;
          this.idcategoria = data.data.idcategoria;
          this.itemEstado = data.data.activo;
          this.imagen = `${environment.imagenesProductos}${data.data.imagen}`;

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




  actualizarProducto() {

    if (this.formCrearProducto.valid) {
      let payload = {
        id: this.idProducto,
        nombre: this.formCrearProducto.value.nombre,
        descripcion: this.formCrearProducto.value.descripcion,
        precio: this.formCrearProducto.value.precio,
        stock: this.formCrearProducto.value.stock,
        activo: this.formCrearProducto.value.itemEstado,
        idcategoria: this.formCrearProducto.value.idcategoria,
      };

      this.productosService.actualizarProducto(payload).subscribe(
        async (data) => {
          if (data.message === 'OK') {
              Swal.fire({
                icon: 'success',
                title: 'Producto Actualizado',
                html: '<h5>Actualización de producto exitoso</h5>',
                confirmButtonText: 'Aceptar',
              }).then((result) => {
                this.ngOnInit();
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

  agregarImagen(event: any){    
    this.file = event.target.files[0];
    this.onFileChanged(event);
    if (this.file!.type.indexOf('image') < 0) {
      Swal.fire({
        icon: 'info',
        title: 'Error',
        html: '<h4>El archivo debe ser del tipo imagen</h4>',
        confirmButtonText: 'Aceptar',
      });
    }
  }

  onFileChanged(event: any) {
    const files = event.target.files;
    if (files.length === 0)
        return;

    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
        return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(files[0]); 
    reader.onload = (_event) => { 
        this.imagenPreview = reader.result; 
    }
}

  actualizarImagenProducto() {

    if (!this.file || this.file == undefined) {
      Swal.fire({
        icon: 'info',
        title: 'Error',
        html: '<h4>Debe seleccionar una imagen</h4>',
        confirmButtonText: 'Aceptar',
      });
      return;
    }

      let payload = {
        id: this.idProducto
      };

      this.productosService.actualizarImagenProducto(payload, this.file!).subscribe(
        async (data) => {
          if (data.message === 'OK') {
              Swal.fire({
                icon: 'success',
                title: 'Imagen actualizada',
                html: '<h5>Actualizacion de imagen exitosa</h5>',
                confirmButtonText: 'Aceptar',
              }).then((result) => {
                this.imagenPreview = null;
                this.ngOnInit();
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
