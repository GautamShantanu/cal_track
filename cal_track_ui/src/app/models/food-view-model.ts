import {MealTypeEnum} from '../enums/meal-type-enum';

export class FoodViewModel {
  id: number;
  name: string;
  foodGroup: string;
  calories: number;
  fat: number;
  protein: number;
  carbohydrate: number;
  servingDescription: string;
  servings: number;
  mealType: string;
  netCalories: number;
  constructor() {
    this.netCalories = 0;
    this.servings = 0;
  }
}
