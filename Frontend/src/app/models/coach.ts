import { Buffer } from 'buffer';

export interface Coach {
    _id?: String;
    fullname: String;
    email: String;
    workArea?: any;
    img?: {
        data: any;
        contentType: string;
    }
    imgSrc?: any,
    age: Number;
    description: String;
    schedule: String;
}
