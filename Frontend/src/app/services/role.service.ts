import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Role } from '../models/role';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private baseUrl='http://localhost:3000/roles'

  constructor(private  _http: HttpClient) { }
 
  getAllRoles():Observable<Role[]>{
    return this._http.get<Role[]>(this.baseUrl+'/');
  } 
  getRoleById(id:String): Observable<Role>{
    return this._http.get<Role>(`${this.baseUrl}/${id}`);
  }
}
