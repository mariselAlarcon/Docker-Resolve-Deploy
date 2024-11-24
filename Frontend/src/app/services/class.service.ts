import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Class } from '../models/class';

@Injectable({
  providedIn: 'root'
})
export class ClassService {
  private baseUrl = 'http://localhost:3000/classes'

  constructor(private _http: HttpClient) { }
  
  getAllClasses():Observable<any>{
    return this._http.get(this.baseUrl+'/')
  }
  getClassById(id:string):Observable<any>{
    return this._http.get(this.baseUrl+'/'+id)
  }
  addClass(classNew:Class):Observable<any>{
    const httpOptions={
      headers:new HttpHeaders({
        'Content-Type':'application/json'
      })
    }
    const body = JSON.stringify(classNew)
    return this._http.post(this.baseUrl+'/add', body, httpOptions)
  }
  deleteClass(id:string):Observable<any>{
    return this._http.delete(this.baseUrl+'/'+id)
  }
  updateClass(classUpdate: Class):Observable<any>{
    const httpOptions={
      headers:new HttpHeaders({
        'Content-Type':'application/json'
      })
    }
    const body = JSON.stringify(classUpdate)
    return this._http.put(`${this.baseUrl}/edit/${classUpdate._id}`,body,httpOptions)
  }
}
