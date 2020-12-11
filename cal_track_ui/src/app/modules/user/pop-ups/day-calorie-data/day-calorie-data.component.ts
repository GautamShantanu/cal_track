import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {UserCalorieViewModel} from '../../../../models/user-calorie-view-model';
import {UserModel} from '../../../../models/user-model';
import foodDataTableConfig from '../../../../../assets/config/food-data-table-config.json';
import activityDataTableConfig from '../../../../../assets/config/activity-data-table-config.json';
import {CalorieDataService} from '../../../../providers/calorie-data.service';

@Component({
  selector: 'app-day-calorie-data',
  templateUrl: './day-calorie-data.component.html',
  styleUrls: ['./day-calorie-data.component.scss']
})
export class DayCalorieDataComponent implements OnInit {
  foodDataColumns: { label: string, property: string }[] = foodDataTableConfig;
  activityDataColumns: { label: string, property: string }[] = activityDataTableConfig;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {
    dayCalorieDetails: UserCalorieViewModel,
      user: UserModel, basalMetabolicRate: number
    },
    private calorieDataService: CalorieDataService) { }

  ngOnInit(): void {
  }

  getFoodDataColumns() {
    return this.foodDataColumns.map(foodData => foodData.property);
  }

  getActivityDataColumns() {
    return this.activityDataColumns.map(activityData => activityData.property);
  }

  getNetCalories() {
    return this.calorieDataService.getNetCalories(this.data.dayCalorieDetails.caloriesIn,
      this.data.dayCalorieDetails.caloriesOut,
      this.data.basalMetabolicRate);
  }
}
