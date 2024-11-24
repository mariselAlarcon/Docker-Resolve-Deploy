import { MemberResponse } from "./member";

export interface AttendanceRecordRequest {
    date: Date;
    member: String;
}
export interface AttendanceRecordResponse {
    _id: String;
    date: Date;
    member: MemberResponse;
}