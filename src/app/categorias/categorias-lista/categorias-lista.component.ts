import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriasService } from 'src/app/servicios/categorias.service';

@Component({
  selector: 'app-categorias-lista',
  templateUrl: './categorias-lista.component.html',
  styleUrls: ['./categorias-lista.component.css']
})
export class CategoriasListaComponent {

  categorias: any = [];

  pageNow = 0;

  constructor(private categoriaService: CategoriasService, private router: Router){}

  ngOnInit() {
    this.listaCategorias();
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

}
