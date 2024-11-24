import { ExerciseResponse } from "./exercise";
import { MuscleGroup } from "./muscle-group";

export interface RoutineRequest {
    name: String;
    exercises: String[];
    releaseDate: Date;
    muscleGroupsSelected: String[];
}
export interface RoutineResponse {
    _id: String
    name: String;
    exercises: ExerciseResponse[];
    releaseDate: Date;
    muscleGroupsSelected: MuscleGroup[];
}
