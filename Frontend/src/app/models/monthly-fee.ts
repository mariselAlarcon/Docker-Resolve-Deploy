import { MemberResponse } from "./member";

export interface MonthlyFeeRequest {
    dueDate: Date;
    amount: Number;
    member: String;
}
export interface MonthlyFeeResponse {
    _id: String;
    dueDate: Date;
    amount: Number;
    member: MemberResponse;
}