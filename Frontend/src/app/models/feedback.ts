import { MemberResponse } from "./member";

export interface FeedbackRequest {
    body: String;
    date: Date;
    score: Number;
    member: String;
}

export interface FeedbackResponse {
    _id: String;
    body: String;
    date: Date;
    score: Number;
    member: MemberResponse;
}