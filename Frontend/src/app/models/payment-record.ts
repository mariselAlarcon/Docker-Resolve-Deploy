import { MonthlyFeeResponse } from "./monthly-fee";

export interface PaymentRecordRequest {
    releaseDate: Date;
    fee: String;
}
export interface PaymentRecordResponse {
    _id: String;
    releaseDate: Date;
    fee: MonthlyFeeResponse;
}
