import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTable} from '@angular/material/table';
import {ActivatedRoute, Router} from '@angular/router';
import {UserCalorieDbModel} from '../../../../models/user-calorie-db-model';
import {CalorieDataService} from '../../../../providers/calorie-data.service';
import {MatDialog} from '@angular/material/dialog';
import {AddCalorieDataComponent} from '../../pop-ups/add-calorie-data/add-calorie-data.component';
import {UserService} from '../../../../providers/user.service';
import {NotificationService} from '../../../../providers/common/notification.service';
import {UserModel} from '../../../../models/user-model';
import {ActivityService} from '../../../../providers/activity.service';
import {FoodService} from '../../../../providers/food.service';
import {UserCalorieViewModel} from '../../../../models/user-calorie-view-model';
import {DayCalorieDataComponent} from '../../pop-ups/day-calorie-data/day-calorie-data.component';

@Component({
  selector: 'app-calorie-details',
  templateUrl: './calorie-details.component.html',
  styleUrls: ['./calorie-details.component.scss']
})
export class CalorieDetailsComponent implements OnInit {
  @ViewChild(MatTable) table: MatTable<string>;
  calorieDetails: UserCalorieDbModel[] = [];
  displayedColumns = ['date', 'caloriesIn', 'caloriesOut', 'netCalories', 'operation'];
  userId: number;
  currentUser: UserModel = new UserModel();
  basalMetabolicRate: number;

  constructor(private route: ActivatedRoute,
              private calorieDataService: CalorieDataService,
              private dialog: MatDialog,
              private userService: UserService,
              private notificationService: NotificationService,
              private router: Router,
              private activityService: ActivityService,
              private foodService: FoodService) { }

  ngOnInit(): void {
    this.initialiseUserDetails();
    this.initialiseCaloriesDataInTable();
  }

  private initialiseCaloriesDataInTable() {
    this.calorieDataService.getCalorieDataByUserId(this.userId).subscribe(
      calorieData => {
        calorieData.forEach(data=> {
          data.date = new Date(data.date);
        })
        this.calorieDetails = calorieData;
        this.renderTableRows();
      }
    );
  }

  private initialiseUserDetails() {
    this.userId = Number(this.route.snapshot.paramMap.get('id'));
    this.userService.getUserById(this.userId).subscribe( userData => {
      if(userData?.id) {
        this.userService.setCurrentUser(userData);
        this.currentUser = userData;
        this.basalMetabolicRate = this.calorieDataService.getBasalMetabolicRateForUser(userData);
      } else {
        this.notificationService.error('Invalid User Id. Please choose User Again!');
        this.router.navigate(['']);
      }
      }
    )
  }

  addCalorieDetails() {
    let dialogRef = this.dialog.open(AddCalorieDataComponent,
      {
        width: '70rem',
        height: '48rem',
        panelClass: 'add-calorie-dialog',
        data: {calorieDetails: this.calorieDetails, basalMetabolicRate: this.basalMetabolicRate}
      });
    dialogRef.afterClosed().subscribe(userCalorieData => {
      let calorieDataDbModel = this.calorieDataService.getUserCalorieDbModel(userCalorieData);
      this.calorieDataService.addCalorieData(calorieDataDbModel).subscribe(response => {
        if(response.statusCode === 200) {
          this.addCalorieDataToTable(calorieDataDbModel);
          this.notificationService.success(`Added the Calorie Data for date: ${calorieDataDbModel.date.toDateString()}`);
        }
        else {
          this.notificationService.error('Error adding user. Please try again');
        }
      });
    })
  }

  private renderTableRows() {
    this.table.renderRows();
  }

  getNetCalories(calorieData: UserCalorieDbModel) {
    return this.calorieDataService.getNetCalories(calorieData.caloriesIn, calorieData.caloriesOut,
      this.basalMetabolicRate);
  }

  private addCalorieDataToTable(calorieDataDbModel: UserCalorieDbModel) {
    this.calorieDetails.push(calorieDataDbModel);
    this.renderTableRows();
  }

  showDayCalorieData(calorieData: UserCalorieDbModel) {
    let dayCalorieDetails: UserCalorieViewModel = new UserCalorieViewModel();
    dayCalorieDetails.foodConsumed = [];
    dayCalorieDetails.activitiesPerformed = [];
    dayCalorieDetails.caloriesIn = calorieData.caloriesIn;
    dayCalorieDetails.caloriesOut = calorieData.caloriesOut;
    dayCalorieDetails.date = calorieData.date;
    this.foodService.getFoodDetailsByIds(calorieData.foodConsumed).subscribe( foodDataList => {
      dayCalorieDetails.foodConsumed = foodDataList;
    });

    this.activityService.getActivityDetailsByIds(calorieData.activitiesPerformed, this.currentUser.weight).subscribe(
      activityDataList => {
        dayCalorieDetails.activitiesPerformed = activityDataList;
      }
    );
    console.log(dayCalorieDetails);
    let dialogRef = this.dialog.open(DayCalorieDataComponent,
      {
        width: '70rem',
        height: '48rem',
        panelClass: 'add-calorie-dialog',
        data: {dayCalorieDetails, user: this.currentUser, basalMetabolicRate: this.basalMetabolicRate}
      });
  }
}
