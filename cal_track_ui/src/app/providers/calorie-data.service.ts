import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {HttpService} from './common/http.service';
import {UserCalorieDbModel} from '../models/user-calorie-db-model';
import {UserModel} from '../models/user-model';
import {UserService} from './user.service';
import {GenderEnum} from '../enums/gender-enum';
import {FormulaeConstants} from '../constants/formulae-constants';
import {UserCalorieViewModel} from '../models/user-calorie-view-model';

@Injectable({
  providedIn: 'root'
})
export class CalorieDataService {
  private getCaloriesDataApi = 'calorieData';
  private addApi = 'calorieData/add';

  constructor(private httpService: HttpService,
              private userService: UserService) { }

  getCalorieDataByUserId(userId: number): Observable<UserCalorieDbModel[]> {
    return this.httpService.get(`${environment.calTrackServiceUrl}/${this.getCaloriesDataApi}?userId=${userId}`);
  }

  addCalorieData(userCalorieData: UserCalorieDbModel) {
    return this.httpService.post(`${environment.calTrackServiceUrl}/${this.addApi}`, {userCalorieData});
  }

  getUserCalorieDbModel(calorieData: UserCalorieViewModel) {
    let calorieDbData: UserCalorieDbModel = new UserCalorieDbModel();
    calorieDbData.caloriesIn = calorieData.caloriesIn;
    calorieDbData.caloriesOut = calorieData.caloriesOut;
    calorieDbData.date = calorieData.date;
    calorieDbData.userId = calorieData.userId;
    calorieData.activitiesPerformed.forEach(activityData => {
      if(activityData.duration !== 0) {
        calorieDbData.activitiesPerformed.push({activityId: activityData.id, duration: activityData.duration});
      }
    });
    calorieData.foodConsumed.forEach(foodData => {
      if(foodData.servings!==0) {
        calorieDbData.foodConsumed.push({foodId: foodData.id, mealType: foodData.mealType, portion: foodData.servings});
      }
    });
    return calorieDbData;
  }

  getNetCalories(caloriesIn: number, caloriesOut: number, basalMetabolicRate) {
    return caloriesIn - caloriesOut - basalMetabolicRate;
  }

  getBasalMetabolicRateForUser(user: UserModel) {
    let ageOfUser = this.userService.getAgeOfUser(user);
    let ageConstant: number;
    let constant: number;
    let heightConstant: number;
    let weightConstant: number;

    if(user.sex === GenderEnum.Male) {
      ageConstant = FormulaeConstants.BMR_AGE_CONSTANT_MALE
      constant = FormulaeConstants.BMR_CONSTANT_MALE;
      heightConstant = FormulaeConstants.BMR_HEIGHT_CONSTANT_MALE;
      weightConstant = FormulaeConstants.BMR_WEIGHT_CONSTANT_MALE;
    } else {
      ageConstant = FormulaeConstants.BMR_AGE_CONSTANT_FEMALE
      constant = FormulaeConstants.BMR_CONSTANT_FEMALE;
      heightConstant = FormulaeConstants.BMR_HEIGHT_CONSTANT_FEMALE;
      weightConstant = FormulaeConstants.BMR_WEIGHT_CONSTANT_FEMALE;
    }
    return (constant + (weightConstant*user.weight) +
      (heightConstant*user.height*FormulaeConstants.FEET_TO_CM_CONSTANT) + (ageConstant*ageOfUser));
  }
}
