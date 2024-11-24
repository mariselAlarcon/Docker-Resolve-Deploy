import { BufferData } from "./buffer-data";

export interface MuscleGroup {
    _id?:String;
    name: String;
    img: {
        data: string;
        contentType: String;
    }
}
