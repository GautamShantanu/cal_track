import {ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {ActivityModel} from '../../../../models/activity-model';
import {FoodDataModel} from '../../../../models/food-data-model';
import {FoodService} from '../../../../providers/food.service';
import {ActivityService} from '../../../../providers/activity.service';
import {UserService} from '../../../../providers/user.service';
import {UserModel} from '../../../../models/user-model';
import {UserCalorieViewModel} from '../../../../models/user-calorie-view-model';
import {Category} from '../../../shared/modules/search/models/category';
import {SubCategory} from '../../../shared/modules/search/models/sub-category';
import {FoodViewModel} from '../../../../models/food-view-model';
import {UtilityService} from '../../../../providers/common/utility.service';
import {MealTypeEnum} from '../../../../enums/meal-type-enum';
import {ActivityViewModel} from '../../../../models/activity-view-model';
import {CalorieDataService} from '../../../../providers/calorie-data.service';
import {UserCalorieDbModel} from '../../../../models/user-calorie-db-model';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-add-calorie-data',
  templateUrl: './add-calorie-data.component.html',
  styleUrls: ['./add-calorie-data.component.scss']
})
export class AddCalorieDataComponent implements OnInit {

  userCalorieData: UserCalorieViewModel = new UserCalorieViewModel();
  foodDataMap: Map<string, FoodDataModel[]>;
  activityDataMap: Map<string, ActivityModel[]>;
  currentUser: UserModel;
  foodCategorySearchData: Category = { label: 'Food Category', list: []};
  foodNameSearchData: SubCategory = { label: 'Food Name', list: []};
  activitySearchData: Category = { label: 'Activity', list: []};
  motionSearchData: SubCategory = { label: 'Motion', list: []};
  mealCategories: { key: string, value: string }[];
  minDate: Date;
  maxDate: Date;

  constructor(private foodDataService: FoodService,
              private activityService: ActivityService,
              private userService: UserService,
              private utilityService: UtilityService,
              private calorieDataService: CalorieDataService,
              @Inject(MAT_DIALOG_DATA) public data: { calorieDetails: UserCalorieDbModel[],
                basalMetabolicRate: number}) { }

  ngOnInit(): void {
    this.initializeInputDateFilters();
    this.initializeActivityMap();
    this.initializeFoodMap();
    this.getCurrentUser();
    this.initializeEnums();
  }

  private initializeInputDateFilters() {
    this.minDate = new Date(new Date().getTime() - (30 * 24 * 60 * 60 * 1000));
    this.maxDate = new Date(new Date().getTime() - (24 * 60 * 60 * 1000));
  }
  initializeFoodMap() {
    this.foodDataMap = new Map<string, FoodDataModel[]>();
    this.foodDataService.getFoodData().subscribe( foodDetails => {
      foodDetails.forEach( foodData => {
        if (this.foodDataMap.has(foodData.foodGroup)) {
          this.foodDataMap.get(foodData.foodGroup).push(foodData);
        }
        else {
          this.foodDataMap.set(foodData.foodGroup, [foodData]);
        }
      });
      this.initializeFoodSearchData();
    });
  }

  initializeActivityMap() {
    this.activityDataMap = new Map<string, ActivityModel[]>();
    this.activityService.getActivities().subscribe( activitiesData => {
      activitiesData.forEach( activityData => {
        if (this.activityDataMap.has(activityData.activity)) {
          this.activityDataMap.get(activityData.activity).push(activityData);
        }
        else {
          this.activityDataMap.set(activityData.activity, [activityData]);
        }
      });
      this.initializeActivitySearchData();
    });
  }

  private initializeEnums() {
    this.mealCategories = this.utilityService.enumSelector(MealTypeEnum);
  }

  isCalorieDataValid() {
    return this.userCalorieData.date && this.userCalorieData.activitiesPerformed[0]?.motion &&
      this.userCalorieData.activitiesPerformed[0]?.netCaloriesBurned && this.userCalorieData.foodConsumed[0]?.servings
      && this.userCalorieData.foodConsumed[0]?.name && this.userCalorieData.userId;
  }

  private getCurrentUser() {
    this.currentUser = this.userService.getCurrentUser();
    this.userCalorieData.userId =  this.currentUser.id.toString();
  }

  getFoodListByGroup(foodGroup: string) {
    return this.foodDataMap.get(foodGroup);
  }

  getMotionListByActivity(activity: string) {
    return this.activityDataMap.get(activity);
  }

  private getFoodDetailsByGroupAndName(foodGroup: string, name: string) {
    return this.foodDataMap.get(foodGroup).filter(foodData=>
      foodData.foodGroup === foodGroup && foodData.name === name)[0];
  }

  private getActivityDetailsByActivityAndMotion(activity: string, motion: string) {
    return this.activityDataMap.get(activity).filter(activityData=>
      activityData.activity === activity && activityData.motion === motion)[0];
  }

  resetFoodData(index: number, foodGroup: string) {
    this.userCalorieData.foodConsumed[index] = new FoodViewModel();
    this.userCalorieData.foodConsumed[index].foodGroup = foodGroup;
  }

  private initializeFoodSearchData() {
    for(let key of this.foodDataMap.keys()) {
      if(key) {
        this.foodCategorySearchData.list.push(key);
      }
    }
  }

  private initializeActivitySearchData() {
    for(let key of this.activityDataMap.keys()) {
      if(key) {
        this.activitySearchData.list.push(key);
      }
    }
  }

  onFoodGroupSelected(foodGroup: string, indexOfFoodData: number) {
    this.userCalorieData.foodConsumed[indexOfFoodData].foodGroup = foodGroup;
    this.foodNameSearchData.list = this.getFoodListByGroup(foodGroup).map(foodData => foodData.name);
  }

  onActivitySelected(activity: string, indexOfActivity: number) {
    this.userCalorieData.activitiesPerformed[indexOfActivity].activity = activity;
    this.motionSearchData.list = this.getMotionListByActivity(activity).map(activityData => activityData.motion);
  }

  onFoodNameSelected(foodName: string, index: number) {
    this.userCalorieData.foodConsumed[index].name = foodName;
    this.setFoodDetailsOnSelection(index);
  }

  onMotionSelected(motion: string, index: number) {
    this.userCalorieData.activitiesPerformed[index].motion = motion;
    this.setActivityDetailsOnSelection(index);
  }

  private setFoodDetailsOnSelection(index: number) {
    let foodDetails: FoodDataModel = this.getFoodDetailsByGroupAndName(
      this.userCalorieData.foodConsumed[index].foodGroup,
      this.userCalorieData.foodConsumed[index].name);
    this.foodDataService.setFoodViewModel(foodDetails, this.userCalorieData.foodConsumed[index]);
  }

  private setActivityDetailsOnSelection(index: number) {
    let activityDetails: ActivityModel = this.getActivityDetailsByActivityAndMotion(
      this.userCalorieData.activitiesPerformed[index].activity,
      this.userCalorieData.activitiesPerformed[index].motion);
    this.activityService.setActivityViewModel(activityDetails, this.userCalorieData.activitiesPerformed[index]);
  }

  isFoodValidSelection(index: number) {
    return this.userCalorieData.foodConsumed[index].foodGroup &&
      this.userCalorieData.foodConsumed[index].name &&
      this.userCalorieData.foodConsumed[index].mealType &&
      this.userCalorieData.foodConsumed[index].servings
  }

  isActivityValidSelection(index: number) {
    return this.userCalorieData.activitiesPerformed[index].activity &&
      this.userCalorieData.activitiesPerformed[index].motion &&
      this.userCalorieData.activitiesPerformed[index].duration
  }

  setFoodCalories(index: number) {
    this.userCalorieData.foodConsumed[index].netCalories = this.foodDataService.calculateNetFoodCaloriesForUser(
      this.userCalorieData.foodConsumed[index].calories, this.userCalorieData.foodConsumed[index].servings);
    return this.userCalorieData.foodConsumed[index].netCalories;
  }

  setActivityBurntCalories(index: number) {
    this.userCalorieData.activitiesPerformed[index].netCaloriesBurned = this.activityService.calculateNetActivityCaloriesForUser(
      this.userCalorieData.activitiesPerformed[index].mets,
      this.userCalorieData.activitiesPerformed[index].duration,
      this.currentUser.weight);
    return this.userCalorieData.activitiesPerformed[index].netCaloriesBurned;
  }

  addEmptyFoodTemplate() {
    let emptyFoodTemplate: FoodViewModel = new FoodViewModel();
    this.userCalorieData.foodConsumed.push(emptyFoodTemplate);
  }

  addEmptyActivityTemplate() {
    let emptyActivityTemplate: ActivityViewModel = new ActivityViewModel();
    this.userCalorieData.activitiesPerformed.push(emptyActivityTemplate);
  }

  setNetCaloriesIn() {
    this.userCalorieData.caloriesIn = this.userCalorieData.foodConsumed.map(food => food.netCalories)
      .reduce((firstFoodNetCalorie,secondFoodNetCalorie) => {
        return firstFoodNetCalorie + secondFoodNetCalorie;
      } );
  }

  setNetCaloriesOut() {
    this.userCalorieData.caloriesOut = this.userCalorieData.activitiesPerformed.map(activity => activity.netCaloriesBurned)
      .reduce((firstActivityBurntCalories,secondActivityBurntCalories) => {
        return firstActivityBurntCalories + secondActivityBurntCalories;
      } );
  }

  isNetCalorieInValid() {
    return this.userCalorieData.foodConsumed.length > 0;
  }

  isNetCalorieOutValid() {
    return this.userCalorieData.activitiesPerformed.length > 0;
  }

  getNetCalories() {
    return this.calorieDataService.getNetCalories(this.userCalorieData.caloriesIn,
      this.userCalorieData.caloriesOut, this.data.basalMetabolicRate);
  }

  filterDatesByUnavailableData = (date: Date): boolean => {
    const blockedDates = this.data.calorieDetails.map(userData => userData.date.valueOf());
    return (!blockedDates.includes(date.valueOf()));
  }

  durationChanged(indexOfActivity: number) {
    this.setActivityBurntCalories(indexOfActivity);
    this.setNetCaloriesOut();
  }

  servingsChanged(indexOfFood: any) {
    this.setFoodCalories(indexOfFood);
    this.setNetCaloriesIn();
  }
}
