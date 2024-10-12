import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { UsuariosService } from 'src/app/servicios/usuarios.service';

import { Router } from '@angular/router';
import { ID_USUARIO } from 'src/app/shared/user';


@Component({
  selector: 'app-usuario-actualizar',
  templateUrl: './usuario-actualizar.component.html',
  styleUrls: ['./usuario-actualizar.component.css']
})
export class UsuarioActualizarComponent    implements OnInit {
  formulario: UntypedFormGroup;

  idusuario = ID_USUARIO;

  nombre: string = '';
  apellido: string = '';
  documento: string = '';
  direccion: string = '';
  telefono: string = '';

  constructor(
    private form: UntypedFormBuilder,
    private usuarioService: UsuariosService,
    private router: Router,
  ) {
    this.formulario = this.form.group({
      nombre: ['',[Validators.required,Validators.minLength(3),Validators.maxLength(15)]],
      apellido: ['',[Validators.required,Validators.minLength(3),Validators.maxLength(15)]],
      documento: ['',[Validators.required,Validators.min(10000),Validators.max(999999999999999)]],
      direccion: ['',[Validators.required,Validators.minLength(5),Validators.maxLength(99)]],
      telefono: ['',[Validators.required,Validators.min(1000000),Validators.max(9999999999)]],
    });
  }

  ngOnInit() {
    this.getDataUsuario();
  }

  getDataUsuario(){
    let payload = {
      id: this.idusuario
    }
    this.usuarioService.getDataUsuario(payload).subscribe(async (data) => {
        if (data.message === 'OK') {
          this.nombre = data.data.nombre;
          this.apellido = data.data.apellido;
          this.documento = data.data.numero_doc;
          this.direccion = data.data.direccion;
          this.telefono = data.data.telefono;
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

  actualizarUsuario() {
    if (this.formulario.valid) {
      let payload = {
        id: this.idusuario,
        nombre: this.formulario.value.nombre,
        apellido: this.formulario.value.apellido,
        numero_doc: this.formulario.value.documento,
        direccion: this.formulario.value.direccion,
        telefono: this.formulario.value.telefono
      };
      this.usuarioService.actualizarUsuario(payload).subscribe(
        async (data) => {
          if (data.message === 'OK') {
              Swal.fire({
                icon: 'success',
                title: 'Actualización exitosa',
                html: '<h5>Actualización exitosa</h5>',
                confirmButtonText: 'Aceptar',
              }).then((result) => {
                this.router.navigate(['/home']);
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
            html: `<h5>${err.error.message}</h5>`,
            confirmButtonText: 'Aceptar',
          });
        }
      );
    }
  }
}
