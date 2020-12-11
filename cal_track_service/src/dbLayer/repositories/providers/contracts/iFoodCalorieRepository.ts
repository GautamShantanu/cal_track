import {FoodCalorieModel} from "../../../../models/foodCalorieModel";

export interface IFoodCalorieRepository {
    getAllFoodCalories(): Promise<FoodCalorieModel[]>;
    getFoodCaloriesById(id: number): Promise<FoodCalorieModel>;
}
