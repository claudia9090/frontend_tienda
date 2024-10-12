import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, tap, throwError } from "rxjs";
import { environment } from "src/environments/environments";
import { TraceService } from './traceService';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class UsuariosService {

    constructor(private http: HttpClient, private traceService: TraceService, private router: Router) {
  }

  public login(data:any): Observable<any> {
      const httpOpcions = {
          headers: new HttpHeaders({
              'Content-Type': 'application/json; charset=utf-8',
          })
      }
      return this.http.post(environment.login, data, httpOpcions).pipe(
        tap((_) => console.log('tap')),
        catchError(this.traceService.handleError)
      )
  }

  public logout(){
    this.router.navigate(['/home']).then(res => {
      localStorage.removeItem('DATAUSER');
      localStorage.clear();
      window.location.reload();
    })
  }

  public registroUsuario(data:any): Observable<any> {
    const httpOpcions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json; charset=utf-8',
        })
    }
    return this.http.post(environment.registroUsuario, data, httpOpcions).pipe(
      tap((_) => console.log('tap')),
      catchError(this.traceService.handleError)
    )
  }

  public getDataUsuario(data:any): Observable<any> {
    const httpOpcions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json; charset=utf-8',
        })
    }
    return this.http.post(environment.getUsuario, data, httpOpcions).pipe(
      tap((_) => console.log('tap')),
      catchError(this.traceService.handleError)
    )
  }

  public actualizarUsuario(data:any): Observable<any> {
    const httpOpcions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json; charset=utf-8',
        })
    }
    return this.http.post(environment.actualizarDatosUsuario, data, httpOpcions).pipe(
      tap((_) => console.log('tap')),
      catchError(this.traceService.handleError)
    )
  }

  public listaEmpleados(): Observable<any> {
    const httpOpcions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json; charset=utf-8',
        })
    }
    return this.http.post(environment.listaEmpleados, httpOpcions).pipe(
      tap((_) => console.log('tap')),
      catchError(this.traceService.handleError)
    )
  }

  public crearEmpleado(data:any): Observable<any> {
    const httpOpcions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json; charset=utf-8',
        })
    }
    return this.http.post(environment.crearEmpleados, data, httpOpcions).pipe(
      tap((_) => console.log('tap')),
      catchError(this.traceService.handleError)
    )
  }

  public getEmpleado(data:any): Observable<any> {
    const httpOpcions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json; charset=utf-8',
        })
    }
    return this.http.post(environment.getEmpleado, data, httpOpcions).pipe(
      tap((_) => console.log('tap')),
      catchError(this.traceService.handleError)
    )
  }

  public actualizarEmpleado(data:any): Observable<any> {
    const httpOpcions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json; charset=utf-8',
        })
    }
    return this.http.post(environment.actualizarEmpleado, data, httpOpcions).pipe(
      tap((_) => console.log('tap')),
      catchError(this.traceService.handleError)
    )
  }

  public recuperarPassword(data:any): Observable<any> {
    const httpOpcions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json; charset=utf-8',
        })
    }
    return this.http.post(environment.recuperarPassword, data, httpOpcions).pipe(
      tap((_) => console.log('tap')),
      catchError(this.traceService.handleError)
    )
  }

  public actualizarPassword(data:any): Observable<any> {
    const httpOpcions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json; charset=utf-8',
        })
    }
    return this.http.post(environment.actualizarPasswordUsuario, data, httpOpcions).pipe(
      tap((_) => console.log('tap')),
      catchError(this.traceService.handleError)
    )
  }


}
