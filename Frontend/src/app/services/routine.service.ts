import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RoutineRequest, RoutineResponse,  } from '../models/routine';

@Injectable({
  providedIn: 'root'
})
export class RoutineService {

  private baseUrl='http://localhost:3000/routines'

  constructor(private _http: HttpClient) { }

  getRoutines():Observable<any> {
    return this._http.get(this.baseUrl+'/');
  }
  getRoutine(id: String): Observable<any> {
    return this._http.get(this.baseUrl+'/'+id);
  }
  addRoutine(routine: RoutineRequest): Observable<any> {
    const httpOptions={
      headers:new HttpHeaders({
        'Content-Type':'application/json'
      })
    }
    const body = JSON.stringify(routine)
    
    return this._http.post(this.baseUrl+'/add', body,httpOptions);
  }
  deleteRoutine(id:string):Observable<any>{
    return this._http.delete<any>(this.baseUrl+'/'+id);
  }
  updateRoutine(routine: RoutineResponse): Observable<any> {
    const httpOptions={
      headers:new HttpHeaders({
        'Content-Type':'application/json'
      })
    }
    const body = JSON.stringify(routine)
    
    return this._http.put(this.baseUrl+'/add', body,httpOptions);
  }
}
