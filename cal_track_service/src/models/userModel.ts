import {gender} from "../enums/gender";

export class UserModel {
    id: string;
    name: string;
    weight: number;
    height: number;
    sex: gender;
    dateOfBirth: Date;
}
