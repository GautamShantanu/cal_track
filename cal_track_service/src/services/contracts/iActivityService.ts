import {ActivityModel} from "../../models/activityModel";

export interface IActivityService {
    getActivities();
    getActivityById(id: number);
}
