import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { UsuariosService } from 'src/app/servicios/usuarios.service';

import { ActivatedRoute, Router } from '@angular/router';
import { RolesService } from 'src/app/servicios/roles.service';


@Component({
  selector: 'app-empleados-actualizar',
  templateUrl: './empleados-actualizar.component.html',
  styleUrls: ['./empleados-actualizar.component.css']
})
export class EmpleadosActualizarComponent   implements OnInit {
  formulario: UntypedFormGroup;

  nombre: string = '';
  apellido: string = '';
  documento: string = '';
  direccion: string = '';
  telefono: string = '';
  email: string = '';
  password: string = '';
  idrol: number = 0;

  idEmpleado: any;

  roles = [];

  listaEstados = [
    {id: 0, name: 'Inactivo'},
    {id: 1, name: 'Activo'},
  ];

  itemEstado: number = 0;

  constructor(
    private form: UntypedFormBuilder,
    private rolesService: RolesService,
    private usuarioService: UsuariosService,
    private router: Router,
    private route: ActivatedRoute

  ) {
    this.formulario = this.form.group({
      nombre: ['',[Validators.required,Validators.minLength(3),Validators.maxLength(15)]],
      apellido: ['',[Validators.required,Validators.minLength(3),Validators.maxLength(15)]],
      documento: ['',[Validators.required,Validators.min(10000),Validators.max(999999999999999)]],
      direccion: ['',[Validators.required,Validators.minLength(5),Validators.maxLength(99)]],
      telefono: ['',[Validators.required,Validators.min(1000000),Validators.max(9999999999)]],
      email: ['',[Validators.required,Validators.minLength(5),Validators.maxLength(100)]],
      idrol: ['',[Validators.required]],
      itemEstado: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => this.idEmpleado = params.id);
    this.listaRoles();
    this.getEmpleado();
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

  getEmpleado(){
    let payload = {
      id: this.idEmpleado
    }
    this.usuarioService.getEmpleado(payload).subscribe(async (data) => {
        if (data.message === 'OK') {
          this.nombre = data.data.nombre;
          this.apellido = data.data.apellido;
          this.documento = data.data.numero_doc;
          this.direccion = data.data.direccion;
          this.telefono = data.data.telefono;
          this.email = data.data.email;
          this.idrol = data.data.idrol;
          this.itemEstado = data.data.activo;
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




  actualizarEmpleado() {
    console.log('this.formulario.value>>>', this.formulario.value);
    if (this.formulario.valid) {
      let payload = {
        id: this.idEmpleado,
        nombre: this.formulario.value.nombre,
        apellido: this.formulario.value.apellido,
        numero_doc: this.formulario.value.documento,
        direccion: this.formulario.value.direccion,
        telefono: this.formulario.value.telefono,
        email: this.formulario.value.email,
        activo: this.formulario.value.itemEstado,
        idrol: this.formulario.value.idrol,
      };
      this.usuarioService.actualizarEmpleado(payload).subscribe(
        async (data) => {
          if (data.message === 'OK') {
              Swal.fire({
                icon: 'success',
                title: 'Actualización exitosa',
                html: '<h5>Actualización de empleado exitosa</h5>',
                confirmButtonText: 'Aceptar',
              }).then((result) => {
                this.router.navigate(['/listaEmpleados']);
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
