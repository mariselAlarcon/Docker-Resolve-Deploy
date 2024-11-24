import { BufferData } from "./buffer-data";
import { MonthlyPlan } from "./monthly-plan";
import { Progress } from "./progress";
import { RoutineResponse } from "./routine";
import { UserRequest, UserResponse } from "./user";

export interface MemberRequest extends UserRequest {
    state: String;
    routines: String[];
    progress: String[];
    mounthlyPlan: String[];
    img:string;
    
}

export interface MemberResponse extends UserResponse {
    _id:String;
    state: String;
    routines: RoutineResponse[];
    progress: Progress[];
    mounthlyPlan: MonthlyPlan[];
    img: string;
}
