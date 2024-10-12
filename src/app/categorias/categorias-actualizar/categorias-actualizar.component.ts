import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriasService } from 'src/app/servicios/categorias.service';


@Component({
  selector: 'app-categorias-actualizar',
  templateUrl: './categorias-actualizar.component.html',
  styleUrls: ['./categorias-actualizar.component.css']
})
export class CategoriasActualizarComponent implements OnInit {

  formulario: UntypedFormGroup;
  idCategoria: any;
  nombre: string = '';

  constructor(
    private form: UntypedFormBuilder,
    private router: Router,
    private categoriaService: CategoriasService,
    private route: ActivatedRoute
  ) {
    this.formulario = this.form.group({
      nombre: ['',[Validators.required,Validators.minLength(3),Validators.maxLength(15)]],
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => this.idCategoria = params.id);
    this.getCategoria();
  }


  getCategoria(){
    let payload = {
      id: this.idCategoria
    }
    this.categoriaService.getCategoria(payload).subscribe(async (data) => {
        if (data.message === 'OK') {
          this.nombre = data.data.nombre;
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




  actualizarCategoria() {

    if (this.formulario.valid) {
      let payload = {
        id: this.idCategoria,
        nombre: this.formulario.value.nombre,
      };

      this.categoriaService.actualizarCategoria(payload).subscribe(async (data) => {
          if (data.message === 'OK') {
              Swal.fire({
                icon: 'success',
                title: 'Categoria Actualizada',
                html: '<h5>Actualización de categoria exitosa</h5>',
                confirmButtonText: 'Aceptar',
              }).then((result) => {
                this.router.navigate(['/listaCategorias']);
              });
          } else {
            Swal.fire({
              icon: 'info',
              title: 'Error',
              html: `<h5>${data.message}</h5>`,
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
