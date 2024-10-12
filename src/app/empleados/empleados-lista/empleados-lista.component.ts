import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuariosService } from 'src/app/servicios/usuarios.service';

@Component({
  selector: 'app-empleados-lista',
  templateUrl: './empleados-lista.component.html',
  styleUrls: ['./empleados-lista.component.css']
})
export class EmpleadosListaComponent implements OnInit {

  listEmpleados: any = [];

  pageNow = 0;

  constructor(private usuariosService: UsuariosService, private router: Router){}

  ngOnInit() {
    this.listaEmpleados();
  }

  listaEmpleados(){
    try{
      this.usuariosService.listaEmpleados().subscribe(async data =>{
        if(data.message == 'OK'){
          this.listEmpleados = data.data;
        }
      })
    }
    catch(error){
      console.log(error);
    }

  }



}
