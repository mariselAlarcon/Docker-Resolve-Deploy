import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private baseUrl='http://localhost:3000/api/payments'
  constructor(private _http: HttpClient) { }

  getPaymentLink(monthlyPlanId : string):Observable<any>{
    const httpOptions={
      headers:new HttpHeaders({
        'Content-Type':'application/json'
      })
    }


    const body = JSON.stringify({
      monthlyPlanId: monthlyPlanId
    })
    
    return this._http.post(this.baseUrl+'/payment', body, httpOptions);
  }
}
