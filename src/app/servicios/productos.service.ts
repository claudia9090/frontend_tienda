import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, tap } from "rxjs";
import { environment } from "src/environments/environments";
import { TraceService } from './traceService';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class ProductosService {

  private productos$: BehaviorSubject<any>;

  constructor(
    private http: HttpClient,
    private traceService: TraceService,
    private router: Router ) {
      this.productos$ = new BehaviorSubject<any>([])
  }

  get getProductos(){
    return this.productos$.asObservable();
  }

  setProductos(array: any){
    this.productos$.next(array);
  }

  public listaProductos(nombreRol: any): Observable<any> {
      const httpOpcions = {
          headers: new HttpHeaders({
              'Content-Type': 'application/json; charset=utf-8',
          })
      }

      if(nombreRol == 'CLIENTE' || nombreRol == 'NONE'){
        return this.http.get(environment.listaProductos, httpOpcions).pipe(
          tap((_) => console.log('tap'))
        )
      }else{
        return this.http.get(environment.listaProductosAdmin, httpOpcions).pipe(
          tap((_) => console.log('tap'))
        )
      }
  }

  public crearProducto(data:any, file: File): Observable<any> {
    
    let formData = new FormData();
    
    formData.append("nombre", data.nombre);
    formData.append("descripcion", data.descripcion);
    formData.append("precio", data.precio);
    formData.append("stock", data.stock);
    formData.append("idcategoria", data.idcategoria);
    formData.append("image", file);

    return this.http.post(environment.crearProducto, formData).pipe(
      tap((_) => console.log('tap')),
      catchError(this.traceService.handleError)
    )
  }

  public getProducto(idProducto:any): Observable<any> {
    const httpOpcions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json; charset=utf-8',
        })
    }
    return this.http.get(`${environment.getProducto}/${idProducto}` , httpOpcions).pipe(
      tap((_) => console.log('tap')),
      catchError(this.traceService.handleError)
    )
  }

  public actualizarProducto(data:any): Observable<any> {
    const httpOpcions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json; charset=utf-8',
        })
    }
    return this.http.post(environment.actualizarProducto, data, httpOpcions).pipe(
      tap((_) => console.log('tap')),
      catchError(this.traceService.handleError)
    )
  }

  public actualizarImagenProducto(data:any, file: File): Observable<any> {
    
    let formData = new FormData();
    
    formData.append("id", data.id);
    formData.append("image", file);

    return this.http.post(environment.actualizarImagenProducto, formData).pipe(
      tap((_) => console.log('tap')),
      catchError(this.traceService.handleError)
    )
  }

  public listaProductosByCategoria(parametros: any): Observable<any> {

    const httpOpcions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json; charset=utf-8',
        }),
        params: parametros
    }

    return this.http.get(environment.listaProductosByCategoria, httpOpcions ).pipe(
      tap((_) => console.log('tap'))
    )
  }

  public listaProductosByBusqueda(parametros: any): Observable<any> {

    const httpOpcions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json; charset=utf-8',
        }),
        params: parametros
    }

    return this.http.get(environment.listaProductosByBusqueda, httpOpcions ).pipe(
      tap((_) => console.log('tap'))
    )
  }

  public listaProductosByOrdenId(parametros: any): Observable<any> {

    const httpOpcions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json; charset=utf-8',
        }),
        params: parametros
    }

    return this.http.get(environment.listaProductosByOrdenId, httpOpcions ).pipe(
      tap((_) => console.log('tap'))
    )
  }

}
