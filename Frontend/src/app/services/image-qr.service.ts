import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageQrService {

  constructor(private _http: HttpClient) { }

  public generate(data:string, size:string):Observable<any>{
    const url = `https://qr-code-generator20.p.rapidapi.com/generatebasicbase64?data=${data}&size=${size}`;
    
    //otra manera:
    //const url = https://qr-code-generator20.p.rapidapi.com/generatebasicbase64?data=${encodeURIComponent(data)}&size=${size};
    
    const httpOptions={
      headers: new HttpHeaders(
         {
          'X-RapidAPI-Key': '1bff2873c9msh1b0868e50f01585p13e01djsnbe9651f8baf4',
          'X-RapidAPI-Host': 'qr-code-generator20.p.rapidapi.com'
        }
      ),
      responseType: 'text' as 'json'
    }
    return this._http.get(url, httpOptions)
  }
}
