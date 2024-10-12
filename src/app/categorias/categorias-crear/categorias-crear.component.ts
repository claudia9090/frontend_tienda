import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { CategoriasService } from 'src/app/servicios/categorias.service';
@Component({
  selector: 'app-categorias-crear',
  templateUrl: './categorias-crear.component.html',
  styleUrls: ['./categorias-crear.component.css']
})
export class CategoriasCrearComponent implements OnInit {

  formulario: UntypedFormGroup;

  nombre: string = '';

  constructor(
    private form: UntypedFormBuilder,
    private router: Router,
    private categoriaService: CategoriasService,
  ) {
    this.formulario = this.form.group({
      nombre: ['',[Validators.required,Validators.minLength(3),Validators.maxLength(15)]],
    });
  }

  ngOnInit() {}

  crearCategoria() {
    if (this.formulario.valid) {
      let payload = {
        nombre: this.formulario.value.nombre
      };
      this.categoriaService.crearCategoria(payload).subscribe(async (data) => {
          if (data.message === 'OK') {
              Swal.fire({
                icon: 'success',
                title: 'Creación exitosa',
                html: '<h5>Creación de categoria exitosa</h5>',
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
