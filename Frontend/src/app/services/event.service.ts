import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EventI } from '../models/event';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  //private baseUrl='http://localhost:3000/events'
 // private baseUrl = `${environment.apiUrl}/events`;  // Usamos environment.apiUrl en lugar de la URL hardcodeada
 private baseUrl = `https://docker-resolve-back.onrender.com/events`;
 
  constructor(private _http:HttpClient) { }
  
 getAllEvents():Observable<any>{
  return this._http.get(this.baseUrl+'/')
 }
 getEventById(id:String):Observable<any>{
  return this._http.get(this.baseUrl+'/'+id)
 }  
 addEvent(event:EventI):Observable<any>{
  const httpOptions={
    headers:new HttpHeaders({
      'Content-Type':'application/json'
    })
  }
  const body = JSON.stringify(event)
  return this._http.post(this.baseUrl+'/add',body,httpOptions)
 }
 deleteEvent(id:string):Observable<any>{
  return this._http.delete(this.baseUrl+'/'+id)
 }
 updateEvent(updateEvent:EventI):Observable<any>{
  const httpOptions={
    headers:new HttpHeaders({
      'Content-Type':'application/json'
    })
  }
  const body = JSON.stringify(updateEvent)
  return this._http.put(`${this.baseUrl}/edit/${updateEvent._id}`,body,httpOptions)

  }
}
