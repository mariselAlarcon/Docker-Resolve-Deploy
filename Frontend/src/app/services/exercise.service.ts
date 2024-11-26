import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ExerciseRequest, ExerciseResponse } from '../models/exercise';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {

 // private baseUrl='http://localhost:3000/exercises'
 private baseUrl = `${environment.apiUrl}/exercises`;  // Usamos environment.apiUrl en lugar de la URL hardcodeada

  constructor(private _http:HttpClient) { }

  getAllExercises():Observable<any>{
    return this._http.get(this.baseUrl+'/');
  }
  getExerciseById(id:String):Observable<any>{
    return this._http.get(`${this.baseUrl}/${id}`);
  }
  addExercise(exercise:ExerciseRequest):Observable<any>{
    const httpOptions={
      headers:new HttpHeaders({
        'Content-Type':'application/json'
      })
    }
    const body = JSON.stringify(exercise)
    return this._http.post(this.baseUrl+'/add', body, httpOptions);
  }
  deleteExercise(id:String):Observable<any>{
    return this._http.delete(`${this.baseUrl}/${id}`);
  }
  updateExercise( exercise:ExerciseResponse):Observable<any>{
    const httpOptions={
      headers:new HttpHeaders({
        'Content-Type':'application/json'
      })
    }
    const body = JSON.stringify(exercise)
    return this._http.post(`${this.baseUrl}/edit/${exercise._id}`,body,httpOptions)
  }

}
