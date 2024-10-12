import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, tap } from 'rxjs';
import { environment } from 'src/environments/environments';
import { TraceService } from './traceService';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class RolesService {

  constructor(
    private http: HttpClient,
    private traceService: TraceService,
    private router: Router
  ) {}

  public listaRoles(): Observable<any> {
    const httpOpcions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8',
      }),
    };
    return this.http.post(environment.listaRoles, httpOpcions).pipe(
      tap((_) => console.log('tap')),
      catchError(this.traceService.handleError)
    );
  }
}
