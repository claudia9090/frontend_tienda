import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { UsuariosService } from 'src/app/servicios/usuarios.service';

import { Router } from '@angular/router';
import { RolesService } from 'src/app/servicios/roles.service';

@Component({
  selector: 'app-empleados-crear',
  templateUrl: './empleados-crear.component.html',
  styleUrls: ['./empleados-crear.component.css']
})
export class EmpleadosCrearComponent  implements OnInit {
  formulario: UntypedFormGroup;

  nombre: string = '';
  apellido: string = '';
  documento: string = '';
  direccion: string = '';
  telefono: string = '';
  email: string = '';
  password: string = '';
  idrol: number = 0;


  roles = [];

  constructor(
    private form: UntypedFormBuilder,
    private rolesService: RolesService,
    private usuarioService: UsuariosService,
    private router: Router
  ) {
    this.formulario = this.form.group({
      nombre: ['',[Validators.required,Validators.minLength(3),Validators.maxLength(15)]],
      apellido: ['',[Validators.required,Validators.minLength(3),Validators.maxLength(15)]],
      documento: ['',[Validators.required,Validators.min(10000),Validators.max(999999999999999)]],
      direccion: ['',[Validators.required,Validators.minLength(5),Validators.maxLength(99)]],
      telefono: ['',[Validators.required,Validators.min(1000000),Validators.max(9999999999)]],
      email: ['',[Validators.required,Validators.minLength(5),Validators.maxLength(100)]],
      password: ['',[Validators.required,Validators.minLength(2),Validators.maxLength(100)]],
      idrol: ['',[Validators.required]]
    });
  }

  ngOnInit() {
    this.listaRoles();
  }

  listaRoles(){
    try{
      this.rolesService.listaRoles().subscribe(async data =>{
        if(data.message == 'OK'){
          this.roles = data.data;
        }
      })
    }
    catch(error){
      console.log(error);
    }

  }



  crearEmpleado() {
    if (this.formulario.valid) {
      let payload = {
        nombre: this.formulario.value.nombre,
        apellido: this.formulario.value.apellido,
        numero_doc: this.formulario.value.documento,
        direccion: this.formulario.value.direccion,
        telefono: this.formulario.value.telefono,
        email: this.formulario.value.email,
        password: this.formulario.value.password,
        idrol: this.formulario.value.idrol.id,
      };
      this.usuarioService.crearEmpleado(payload).subscribe(
        async (data) => {
          if (data.message === 'OK') {
              Swal.fire({
                icon: 'success',
                title: 'Registro exito',
                html: '<h5>Registro de empleado exito</h5>',
                confirmButtonText: 'Aceptar',
              }).then((result) => {
                this.router.navigate(['/listaEmpleados']);
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
            html: `<h5>${err.error.message}</h5>`,
            confirmButtonText: 'Aceptar',
          });
        }
      );
    }
  }
}
