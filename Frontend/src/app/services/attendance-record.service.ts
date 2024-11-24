import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AttendanceRecordRequest, AttendanceRecordResponse } from '../models/attendance-record';

@Injectable({
  providedIn: 'root'
})
export class AttendanceRecordService {

  private baseUrl='http://localhost:3000/attendanceRecords'

  constructor(private _http:HttpClient) { }

 getAttendanceRecords():Observable<any> {
    return this._http.get(this.baseUrl+'/');
  }
  getAttendanceRecordById(id:string):Observable<any>{
   return this._http.get(`${this.baseUrl}/${id}`);
 }
 getAttendanceRecordByMember(idMember:string):Observable<any>{
  return this._http.get(`${this.baseUrl}/member/${idMember}`);
}
getAttendanceRecordByMemberAndMonth(idMember:string,month:number,year:number):Observable<any>{
  return this._http.get(`${this.baseUrl}/attendance/${idMember}/${year}/${month}`);
}
 addAttendanceRecord(attendanceRecord:AttendanceRecordRequest):Observable<any>{
  const httpOptions={
    headers:new HttpHeaders({
      'Content-Type':'application/json'
    })
  }
  const body = JSON.stringify(attendanceRecord)
  return this._http.post(this.baseUrl+'/add',body,httpOptions);
 }
 updateAttendanceRecord(attendanceRecord:AttendanceRecordResponse):Observable<any>{
  const httpOptions={
    headers:new HttpHeaders({
      'Content-Type':'application/json'
    })
  }
  const body = JSON.stringify(attendanceRecord)
  return this._http.put(this.baseUrl+`/edit/${attendanceRecord._id}`,body,httpOptions);
 }
  deleteAttendanceRecord(id:string):Observable<any>{
      return this._http.delete(`${this.baseUrl}/${id}`);
    }
}
