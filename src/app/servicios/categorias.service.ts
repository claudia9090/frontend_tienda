import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, tap } from "rxjs";
import { environment } from "src/environments/environments";
import { TraceService } from './traceService';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})


export class CategoriasService {
  
  constructor(
    private http: HttpClient,
     private traceService: TraceService,
    private router: Router
    ) {}

  public listaCategorias(): Observable<any> {
    const httpOpcions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json; charset=utf-8',
        })
    }
    return this.http.post(environment.listaCategorias, httpOpcions).pipe(
      tap((_) => console.log('tap'))
    )
  }

  public crearCategoria(data:any): Observable<any> {
    const httpOpcions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json; charset=utf-8',
        })
    }
    return this.http.post(environment.crearCategoria, data, httpOpcions).pipe(
      tap((_) => console.log('tap')),
      catchError(this.traceService.handleError)
    )
  }

  public getCategoria(data:any): Observable<any> {
    const httpOpcions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json; charset=utf-8',
        })
    }
    return this.http.post(environment.getCategoria, data, httpOpcions).pipe(
      tap((_) => console.log('tap')),
      catchError(this.traceService.handleError)
    )
  }

  public actualizarCategoria(data:any): Observable<any> {
    const httpOpcions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json; charset=utf-8',
        })
    }
    return this.http.post(environment.actualiazarCategoria, data, httpOpcions).pipe(
      tap((_) => console.log('tap')),
      catchError(this.traceService.handleError)
    )
  }

}
