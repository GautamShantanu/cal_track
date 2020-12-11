export class UserCalorieDbModel {
    date: Date;
    userId: string;
    foodConsumed: { foodId: number, portion: number, mealType: string }[];
    activitiesPerformed: { activityId: number, duration: number }[];
    caloriesIn: number;
    caloriesOut: number;

    constructor() {
        this.foodConsumed = [];
        this.caloriesIn = 0;
        this.activitiesPerformed = [];
        this.caloriesOut = 0;
    }
}
