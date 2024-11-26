import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Coach } from '../models/coach';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CoachService {

  //private baseUrl= 'http://localhost:3000/coaches'
  //private baseUrl = `${environment.apiUrl}/coaches`;  // Usamos environment.apiUrl en lugar de la URL hardcodeada
  private baseUrl = `https://docker-resolve-back.onrender.com/coaches`;
  
  constructor(private _http: HttpClient) { }

 getAllCoaches():Observable<any>{
  return this._http.get(this.baseUrl+'/')
 }
 getCoachById(id: string):Observable<any>{
  return this._http.get(this.baseUrl+'/'+id)
 }
 addCoach(coach: Coach):Observable<any>{
  const httpOptions={
    headers:new HttpHeaders({
      'Content-Type':'application/json'
    })
  }
  const body = JSON.stringify(coach)
  return this._http.post(this.baseUrl+'/add', coach)
 }
 deleteCoach(id:string):Observable<any>{
  return this._http.delete(this.baseUrl+'/'+id)
 }
 updateCoach(coach: Coach):Observable<any>{
  const httpOptions={
    headers:new HttpHeaders({
      'Content-Type':'application/json'
    })
  }
  const body = JSON.stringify(coach)
  return this._http.put(`${this.baseUrl}/edit/${coach._id}`, coach, httpOptions)
 }

}
