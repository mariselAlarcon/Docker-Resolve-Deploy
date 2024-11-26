import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MemberRequest, MemberResponse } from '../models/member';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  //private baseUrl='http://localhost:3000/members'
  private baseUrl = `${environment.apiUrl}/members`;  // Usamos environment.apiUrl en lugar de la URL hardcodeada

  constructor(private _http:HttpClient) { }


 getMembers():Observable<any> {
    return this._http.get(this.baseUrl+'/');
  }
 getMemberById(id:string):Observable<MemberResponse>{
   return this._http.get<MemberResponse>(`${this.baseUrl}/${id}`);
 }
 getMemberByDNI(dni:string):Observable<any>{
  return this._http.get(`${this.baseUrl}/dni/${dni}`);
}
 addMemeber(mem:MemberRequest):Observable<MemberRequest>{
  const httpOptions={
    headers:new HttpHeaders({
      'Content-Type':'application/json'
    })
  }
  const body = JSON.stringify(mem)
  return this._http.post<MemberRequest>(this.baseUrl+'/add',body,httpOptions);
 }
 updateMember(mem:MemberResponse):Observable<MemberResponse>{
  const httpOptions={
    headers:new HttpHeaders({
      'Content-Type':'application/json'
    })
  }
  const body = JSON.stringify(mem)
  return this._http.put<MemberResponse>(`${this.baseUrl}/edit/${mem._id}`,body,httpOptions);
  }
  deleteMember(id:string):Observable<any>{
      return this._http.delete(`${this.baseUrl}/${id}`);
    }
  
  getProgressByMember(id:string):Observable<any>{
    return this._http.get(`${this.baseUrl}/progress/${id}`);
  }

  getRoutinesByMember(id:string):Observable<any>{
    return this._http.get(`${this.baseUrl}/routines/${id}`);
  }

  addRoutine(idRoutine : string, idMember: string):Observable<any>{
    const httpOptions={
      headers:new HttpHeaders({
        'Content-Type':'application/json'
      })
    }
    console.log(idRoutine);
    
    const body = JSON.stringify({
      "routine": idRoutine
    })
    return this._http.put(`${this.baseUrl}/edit/routine/${idMember}`,body,httpOptions);
    }

    addProgress(idProgress : string, idMember: string):Observable<any>{
      const httpOptions={
        headers:new HttpHeaders({
          'Content-Type':'application/json'
        })
      }
      console.log(idProgress);
      
      const body = JSON.stringify({
        "progress": idProgress
      })
      return this._http.put(`${this.baseUrl}/edit/progress/${idMember}`,body,httpOptions);
      }
    
      changePlan(idMonthlyPlan : string, idMember: string):Observable<any>{
        const httpOptions={
          headers:new HttpHeaders({
            'Content-Type':'application/json'
          })
        }
        console.log(idMonthlyPlan);
        
        const body = JSON.stringify({
          "monthlyPlan": idMonthlyPlan
        })
        return this._http.put(`${this.baseUrl}/edit/monthlyPlan/${idMember}`,body,httpOptions);
        }
}
