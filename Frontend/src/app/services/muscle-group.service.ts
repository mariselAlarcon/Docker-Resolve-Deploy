import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MuscleGroup } from '../models/muscle-group';

@Injectable({
  providedIn: 'root'
})
export class MuscleGroupService {
  
  private baseUrl='http://localhost:3000/muscleGroups'
  constructor(private _http: HttpClient) { }

  getAllMuscleGroups():Observable<any> {
    return this._http.get(this.baseUrl+'/');
  }
  getMuscleGroupById(id: String): Observable<any> {
    return this._http.get(`${this.baseUrl}/${id}`);
  }
}
