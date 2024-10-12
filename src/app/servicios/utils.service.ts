import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  private _dateObs: Observable<Date>;


  constructor(){
    this._dateObs = new Observable(observer => {
      setInterval(() => {
        observer.next(new Date())
      }, 1000)
    });
   }

   get dateObs(){
    return this._dateObs;
   }


}
