import { Injectable } from '@angular/core';
import {HttpService} from './common/http.service';
import {forkJoin, Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {ActivityModel} from '../models/activity-model';
import {ActivityViewModel} from '../models/activity-view-model';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  private getAllApi = 'activity/getAll';
  private getByIdApi = 'activity';

  constructor(private httpService: HttpService) { }

  getActivities(): Observable<ActivityModel[]> {
    return this.httpService.get(`${environment.calTrackServiceUrl}/${this.getAllApi}`);
  }

  getActivityById(id: number): Observable<ActivityModel> {
    return this.httpService.get(`${environment.calTrackServiceUrl}/${this.getByIdApi}?id=${id}`);
  }

  setActivityViewModel(activityDetails: ActivityModel, activityViewModel: ActivityViewModel) {
    activityViewModel.duration = 0;
    activityViewModel.id = activityDetails.id;
    activityViewModel.mets = activityDetails.mets;
    activityViewModel.netCaloriesBurned = 0;
  }

  calculateNetActivityCaloriesForUser(mets: number, duration: number, weight: number) {
    return mets*duration*weight;
  }

  getActivityDetailsByIds(activityList: { activityId: number, duration: number }[], weightOfUser: number) {
    let activityDetailsObservable: Observable<ActivityViewModel>[] = [];
    activityList.forEach( userActivityData => {
      activityDetailsObservable.push(this.getActivityById(userActivityData.activityId).pipe(map( activityDbModel=> {
        let activityViewModel = new ActivityViewModel();
        this.setActivityViewModel(activityDbModel, activityViewModel);
        activityViewModel.activity = activityDbModel.activity;
        activityViewModel.motion = activityDbModel.motion;
        activityViewModel.duration = userActivityData.duration;
        activityViewModel.netCaloriesBurned = this.calculateNetActivityCaloriesForUser(activityViewModel.mets,
          activityViewModel.duration, weightOfUser );
        return activityViewModel;
      })));
    });
    return forkJoin(activityDetailsObservable);
  }
}
