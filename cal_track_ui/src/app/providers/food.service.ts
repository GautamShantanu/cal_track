import { Injectable } from '@angular/core';
import {HttpService} from './common/http.service';
import {forkJoin, Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {FoodDataModel} from '../models/food-data-model';
import {map} from 'rxjs/operators';
import {FoodViewModel} from '../models/food-view-model';

@Injectable({
  providedIn: 'root'
})
export class FoodService {
  private getAllApi = 'foodCalorie/getAll';
  private getByIdApi = 'foodCalorie';

  constructor(private httpService: HttpService) { }
  getFoodData(): Observable<FoodDataModel[]> {
    return this.httpService.get(`${environment.calTrackServiceUrl}/${this.getAllApi}`);
  }

  getFoodDataById(id: number): Observable<FoodDataModel> {
    return this.httpService.get(`${environment.calTrackServiceUrl}/${this.getByIdApi}?id=${id}`);
  }

  getFoodDetailsByIds(foodDetailsList: { foodId: number, portion: number, mealType: string }[]):
    Observable<FoodViewModel[]> {
    let foodDetailsObservable: Observable<FoodViewModel>[] = [];
    foodDetailsList.forEach( foodData => {
      foodDetailsObservable.push(this.getFoodDataById(foodData.foodId).pipe(map( food=> {
        let foodViewModel = new FoodViewModel();
        this.setFoodViewModel(food, foodViewModel);
        foodViewModel.foodGroup = food.foodGroup;
        foodViewModel.name = food.name;
        foodViewModel.servings = foodData.portion;
        foodViewModel.mealType = foodData.mealType;
        foodViewModel.netCalories =
          this.calculateNetFoodCaloriesForUser(foodViewModel.calories, foodViewModel.servings);
        console.log(foodViewModel);
        console.log(food);
        return foodViewModel;
      })));
    });
    return forkJoin(foodDetailsObservable);
  }


  setFoodViewModel(foodDetails: FoodDataModel, foodViewModel) {
    foodViewModel.calories = foodDetails.calories;
    foodViewModel.carbohydrate = foodDetails.carbohydrate;
    foodViewModel.fat = foodDetails.fat;
    foodViewModel.id = foodDetails.id;
    foodViewModel.protein = foodDetails.protein;
    foodViewModel.servingDescription = foodDetails.servingDescription;
    foodViewModel.servings = 0;
    foodViewModel.netCalories = 0;
  }

  calculateNetFoodCaloriesForUser(calories: number, servings: number) {
    return calories*servings;
  }
}
