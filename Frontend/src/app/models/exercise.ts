import { MuscleGroup } from "./muscle-group";

interface ExerciseImage {
    data: String;
    contentType: string;
}

export interface ExerciseRequest {
    name: String;
    set: Number;
    rep: Number;
    accessory: String;
    instruction: String;
    difficult: String; //Principiante, Intermedio, Avanzado
    type: String; //Cardio Musculacion
    //images: ExerciseImage[];
    images: any;
    muscleGroup: String; //Request: Llave, Response: Llave
}

export interface ExerciseResponse {
    _id: String;
    name: String;
    set: Number;
    rep: Number;
    accessory: String;
    instruction: String;
    difficult: String; //Principiante, Intermedio, Avanzado
    type: String; //Cardio Musculacion
    //images: ExerciseImage[] ;
    images: any;
    imgURL: any;
    muscleGroup: String; //Request: Llave, Response: Llave
}


