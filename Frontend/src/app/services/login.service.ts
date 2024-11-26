import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  //private baseUrl = 'http://localhost:3000/login'
  private baseUrl = `${environment.apiUrl}/login`;  // Usamos environment.apiUrl en lugar de la URL hardcodeada

  constructor(private _http: HttpClient) { }

  login(username: string, pwd: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    const body = JSON.stringify({ username: username, password: pwd })

    return this._http.post(this.baseUrl + '/', body, httpOptions)
  }

  //logout
  logout() {
    sessionStorage.removeItem("userId");
    sessionStorage.removeItem("roleUser");
  }


  //Comprobar si hay un usuario logueado
  userLoggedIn() {
    var usuario = sessionStorage.getItem("userId");
    if (usuario != null) {
      return true;
    } else {
      return false;
    }
  }

  //obtener el usuario
  userLogged() {
    var usuario = sessionStorage.getItem("userId");
    return usuario? usuario:'';
  }
  
  //obtener el rol de usuario
  getRoleUserLogged(){
    var role = sessionStorage.getItem("roleUser");
    return role;
  }

}
