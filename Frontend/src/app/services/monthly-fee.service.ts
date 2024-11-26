import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MonthlyFeeRequest, MonthlyFeeResponse } from '../models/monthly-fee';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MonthlyFeeService {

  //private baseUrl='http://localhost:3000/monthlyFees'
  private baseUrl = `${environment.apiUrl}/monthlyFees`;  // Usamos environment.apiUrl en lugar de la URL hardcodeada

  constructor(private _http: HttpClient) { }

  getAllMonthlyFees():Observable<any> {
    return this._http.get(this.baseUrl+'/');
  }
  getMonthlyFeeById(id: String): Observable<any> {
    return this._http.get(this.baseUrl+'/'+id);
  }
  addMonthlyFee(monthlyFee: MonthlyFeeRequest): Observable<any> {
    const httpOptions={
      headers:new HttpHeaders({
        'Content-Type':'application/json'
      })
    }
    const body = JSON.stringify(monthlyFee)
    return this._http.post(this.baseUrl+'/add', body, httpOptions);
  }
  deleteMonthlyFee(id: String): Observable<any> {
    return this._http.delete(this.baseUrl+'/'+id);
  }
  updateMonthlyFee(monthlyFee: MonthlyFeeResponse): Observable<any> {
    const httpOptions={
      headers:new HttpHeaders({
        'Content-Type':'application/json'
      })
    }
    const body = JSON.stringify(monthlyFee)
    return this._http.post(`${this.baseUrl}/edit/${monthlyFee._id}`, body, httpOptions)
  }

  getByMemeberId(idMember: string):Observable<any>{
    return this._http.get(`${this.baseUrl}/getByMember/${idMember}`)
  }
  getDueByMemberId(idMember: string): Observable<any>{
    return this._http.get(`${this.baseUrl}/due/${idMember}`)
  }

}
