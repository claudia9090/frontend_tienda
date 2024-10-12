import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, tap, throwError } from "rxjs";
import { environment } from "src/environments/environments";
import { TraceService } from './traceService';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class OrdenesService {

  constructor(private http: HttpClient, private traceService: TraceService, private router: Router) {
  }

  public crearOrdenAgregarProducto(data:any): Observable<any> {
    const httpOpcions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json; charset=utf-8',
        })
    }
    return this.http.post(environment.crearOrden, data, httpOpcions).pipe(
      tap((_) => console.log('tap')),
      catchError(this.traceService.handleError)
    )
  }

  public cantidadProductosCarrito(data:any): Observable<any> {
    const httpOpcions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json; charset=utf-8',
        })
    }
    return this.http.post(environment.cantidadProductosCarrito, data, httpOpcions).pipe(
      tap((_) => console.log('tap')),
      catchError(this.traceService.handleError)
    )
  }

  public listaEstadosOrden(): Observable<any> {

    const httpOpcions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json; charset=utf-8',
        }),
    }

    return this.http.post(environment.listaEstadosOrden, httpOpcions ).pipe(
      tap((_) => console.log('tap'))
    )
  }


  public listaOrdenesAdmin(): Observable<any> {

    const httpOpcions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json; charset=utf-8',
        }),
    }

    return this.http.post(environment.listaOrdenesAdmin, httpOpcions ).pipe(
      tap((_) => console.log('tap'))
    )
  }

  public actualizarEstado(data: any): Observable<any> {

    const httpOpcions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json; charset=utf-8',
        }),
    }

    return this.http.post(environment.actualizarEstado, data, httpOpcions ).pipe(
      tap((_) => console.log('tap'))
    )
  }

  public listaOrdenesCliente(data: any): Observable<any> {

    const httpOpcions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json; charset=utf-8',
        }),
    }

    return this.http.post(environment.listaOrdenesCliente, data, httpOpcions ).pipe(
      tap((_) => console.log('tap'))
    )
  }

  public confirmarOrdenRecibida(data: any): Observable<any> {

    const httpOpcions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json; charset=utf-8',
        }),
    }

    return this.http.post(environment.confirmarOrdenRecibida, data, httpOpcions ).pipe(
      tap((_) => console.log('tap'))
    )
  }

}
