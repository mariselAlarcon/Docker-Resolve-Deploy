export interface EventI {
    _id?: String;
    name: String;
    description: String;
    date: Date;
    startTime: Date;
    finishTime:Date;
}

export interface EventIResp {
    _id?: String;
    name: String;
    description: String;
    date: string;
    startTime: string;
    finishTime:string;
}