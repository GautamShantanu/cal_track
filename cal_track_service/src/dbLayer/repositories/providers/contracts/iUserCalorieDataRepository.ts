import {UserCalorieDataModel} from "../../../../models/userCalorieDataModel";

export interface IUserCalorieDataRepository {
    getNetCalorieDataByUserId(userId: string): Promise<UserCalorieDataModel[]>;
    addCalorieData(calorieData: UserCalorieDataModel);
}
