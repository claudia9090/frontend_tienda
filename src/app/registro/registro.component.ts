import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { UsuariosService } from '../servicios/usuarios.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})
export class RegistroComponent implements OnInit {
  formRegistro: UntypedFormGroup;

  nombre: string = '';
  apellido: string = '';
  documento: string = '';
  direccion: string = '';
  telefono: string = '';
  email: string = '';
  password: string = '';

  constructor(
    private form: UntypedFormBuilder,
    private usuarioService: UsuariosService,
    private router: Router
  ) {
    this.formRegistro = this.form.group({
      nombre: ['',[Validators.required,Validators.minLength(3),Validators.maxLength(15)]],
      apellido: ['',[Validators.required,Validators.minLength(3),Validators.maxLength(15)]],
      documento: ['',[Validators.required,Validators.min(10000),Validators.max(999999999999999)]],
      direccion: ['',[Validators.required,Validators.minLength(5),Validators.maxLength(99)]],
      telefono: ['',[Validators.required,Validators.min(1000000),Validators.max(9999999999)]],
      email: ['',[Validators.required,Validators.minLength(5),Validators.maxLength(100)]],
      password: ['',[Validators.required,Validators.minLength(2),Validators.maxLength(100)]]
    });
  }

  ngOnInit() {}

  crearUsuario() {
    if (this.formRegistro.valid) {
      document.getElementById('closeModal')?.click();
      let payload = {
        nombre: this.formRegistro.value.nombre,
        apellido: this.formRegistro.value.apellido,
        numero_doc: this.formRegistro.value.documento,
        direccion: this.formRegistro.value.direccion,
        telefono: this.formRegistro.value.telefono,
        email: this.formRegistro.value.email,
        password: this.formRegistro.value.password,
      };
      this.usuarioService.registroUsuario(payload).subscribe(
        async (data) => {
          if (data.message === 'OK') {
              Swal.fire({
                icon: 'success',
                title: 'Registro exito',
                html: '<h5>Registro de usuario exito</h5>',
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
