import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, tap } from 'rxjs';
import { TraceService } from './traceService';
import { environment } from 'src/environments/environments';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  private cantidadProductosCar$: BehaviorSubject<number>;

  constructor(private http: HttpClient, private traceService: TraceService, private router: Router){
    this.cantidadProductosCar$ = new BehaviorSubject<number>(0);
   }

  get getCantidadProductosCar(){
    return this.cantidadProductosCar$.asObservable();
  }

  setCantidadProductosCar(item: any){
    this.cantidadProductosCar$.next(item);
  }

  productosCarrito(data:any): Observable<any> {
    const httpOpcions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json; charset=utf-8',
        })
    }
    return this.http.post(environment.productosCarrito, data, httpOpcions).pipe(
      tap((_) => console.log('tap')),
      catchError(this.traceService.handleError)
    )
  }

  eliminarProductoCarrito(data:any): Observable<any> {
    const httpOpcions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json; charset=utf-8',
        })
    }
    return this.http.post(environment.eliminarProductoCarrito, data, httpOpcions).pipe(
      tap((_) => console.log('tap')),
      catchError(this.traceService.handleError)
    )
  }

  pagarOrden(data:any): Observable<any> {
    const httpOpcions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json; charset=utf-8',
        })
    }
    return this.http.post(environment.pagarOrden, data, httpOpcions).pipe(
      tap((_) => console.log('tap')),
      catchError(this.traceService.handleError)
    )
  }

}
