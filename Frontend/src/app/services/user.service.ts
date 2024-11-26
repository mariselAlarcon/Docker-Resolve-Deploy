import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserRequest, UserResponse } from '../models/user';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  
  //baseUrl='http://localhost:3000/users'
  private baseUrl = `${environment.apiUrl}/users`;  // Usamos environment.apiUrl en lugar de la URL hardcodeada

  constructor(private _http: HttpClient) { }

  getUsers():Observable<any>{
    const httpOptions={
      headers: new HttpHeaders({
        'content-type':'application/json'
      })
    };
    return this._http.get(this.baseUrl+'/',httpOptions);
  }

 getUserById(idUser: String):Observable<any>{
  return this._http.get(`${this.baseUrl}/${idUser}`);
 }

 //router.post('/add',upload.single('img'),userValidation, userController.add);
 addUser(user: UserRequest):Observable<any>{
  const httpOptions={
    headers: new HttpHeaders({
      'Content-Type':'application/json'
    })
  };
  const body=JSON.stringify(user);
  return this._http.post(`${this.baseUrl}/add`,body, httpOptions);
 }


 deleteUserById(idUser: String):Observable<void>{
  return this._http.delete<void>(`${this.baseUrl}/${idUser}`);

 }
 
//router.put('/edit/:id',upload.single('img'),userValidation, userController.update);

updateUser(user: UserResponse):Observable<any>{
  const httpOptions={
    headers: new HttpHeaders({
      'Content-Type':'application/json'
    })
  };
  const body=JSON.stringify(user);
  return this._http.post(`${this.baseUrl}/edit/${user._id}`,body, httpOptions);
 }

}
