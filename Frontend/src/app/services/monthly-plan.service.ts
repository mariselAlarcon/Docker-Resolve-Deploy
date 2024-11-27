import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MonthlyPlan } from '../models/monthly-plan';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MonthlyPlanService {
 //private baseUrl='http://localhost:3000/monthlyPlans'
 private baseUrl = `${environment.apiUrl}/monthlyPlans`;  // Usamos environment.apiUrl en lugar de la URL hardcodeada 
 //private baseUrl = 'https://docker-resolve-back.onrender.com/monthlyPlans'
 

 constructor(private _http: HttpClient) { }

  getAllMonthlyPlans():Observable<MonthlyPlan[]>{
    return this._http.get<MonthlyPlan[]>(this.baseUrl+'/');
  }

  getMonthlyPlanById(id: string):Observable<any>{
    return this._http.get(this.baseUrl + '/' + id);
  }
  addMonthlyPlan(monthlyPlan: MonthlyPlan): Observable<MonthlyPlan>{
    const httpOptions={
      headers:new HttpHeaders({
        'Content-Type':'application/json'
      })
    }
    const body = JSON.stringify(monthlyPlan)
    return this._http.post<MonthlyPlan>(this.baseUrl + '/add', body, httpOptions);
  }
  deleteMonthlyPlan(id: number): Observable<any>{
    return this._http.delete(this.baseUrl + '/' + id);
  }
  updateMonthlyPlan(monthlyPlan: MonthlyPlan): Observable<MonthlyPlan>{
    const httpOptions={
      headers:new HttpHeaders({
        'Content-Type':'application/json'
      })
    }
    const body = JSON.stringify(monthlyPlan)
    return this._http.put<MonthlyPlan>(this.baseUrl + '/edit/' + monthlyPlan._id, body, httpOptions);  
  }

}
