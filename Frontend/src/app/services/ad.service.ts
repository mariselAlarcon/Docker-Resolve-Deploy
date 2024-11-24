import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ad } from '../models/ad';
@Injectable({
  providedIn: 'root'
})
export class AdService {
  
  private baseUrl='http://localhost:3000/ads'

  constructor(private _htpp: HttpClient) { }

 getAllAds():Observable<Ad[]>{
  return this._htpp.get<Ad[]>(this.baseUrl+'/' );
 }
 getAdById(idAd: string):Observable<Ad>{
  return this._htpp.get<Ad>(`${this.baseUrl}/${idAd}` );
 }
 addAd(AdNew: Ad):Observable<Ad>{
  const httpOptions={
    headers:new HttpHeaders({
      'Content-Type':'application/json'
    })
  }
  const body = JSON.stringify(AdNew)
  return this._htpp.post<Ad>(`${this.baseUrl}/add`,body, httpOptions)
 }
 deleterAd(id: string):Observable<Ad>{
  return this._htpp.delete<Ad>(`${this.baseUrl}/${id}`)
 }

 updateAd(ad: Ad):Observable<Ad>{
  const httpOptions={
    headers:new HttpHeaders({
      'Content-Type':'application/json'
    })
  }
  const body = JSON.stringify(ad)
  return this._htpp.post<Ad>(`${this.baseUrl}/edit/${ad._id}`, body,httpOptions)
 }

}
