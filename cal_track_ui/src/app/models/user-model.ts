import {GenderEnum} from '../enums/gender-enum';

export class UserModel {
    id: number;
    name: string;
    weight: number;
    height: number;
    sex: GenderEnum;
    dateOfBirth: Date;
}
