import {FoodViewModel} from './food-view-model';
import {ActivityViewModel} from './activity-view-model';

export class UserCalorieViewModel {
  date: Date;
  userId: string;
  foodConsumed: FoodViewModel[];
  activitiesPerformed: ActivityViewModel[];
  caloriesIn: number;
  caloriesOut: number;

  constructor() {
    this.foodConsumed = [new FoodViewModel()];
    this.activitiesPerformed = [new ActivityViewModel()];
    this.caloriesIn = 0;
    this.caloriesOut = 0;
  }
}
