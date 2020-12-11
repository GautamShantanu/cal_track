import {UserCalorieDataModel} from "../../models/userCalorieDataModel";

export interface IUserCalorieDataService {
    getCalorieDataByUserId(userId: string);
    addCalorieData(userCalorieData: UserCalorieDataModel);
}
