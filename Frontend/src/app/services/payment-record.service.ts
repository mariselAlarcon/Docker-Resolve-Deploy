import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaymentRecordRequest, PaymentRecordResponse } from '../models/payment-record';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PaymentRecordService {
  private baseUrl='http://localhost:3000/paymentRecords'
  constructor(private _http: HttpClient) { }

  getAllPaymentRecord():Observable<any>{
    return this._http.get(`${this.baseUrl}/`);
  }
  getPaymentRecordById(id: String): Observable<any>{
    return this._http.get(`${this.baseUrl}/${id}`);
  }
  addPaymentRecord(paymentRecord: PaymentRecordRequest): Observable<any>{
    const httpOptions={
      headers:new HttpHeaders({
        'Content-Type':'application/json'
      })
    }
    const body = JSON.stringify(paymentRecord)
    
    return this._http.post(this.baseUrl+'/add', body, httpOptions);
  }
  deletePaymentRecord(id: String): Observable<any>{
    return this._http.delete(`${this.baseUrl}/${id}`);
  }
  updatePaymentRecord(paymentRecord: PaymentRecordResponse): Observable<any>{
    const httpOptions={
      headers:new HttpHeaders({
        'Content-Type':'application/json'
      })
    }
    const body = JSON.stringify(paymentRecord)
    return this._http.put(`${this.baseUrl}/edit/${paymentRecord._id}`, body, httpOptions);
  }

}
