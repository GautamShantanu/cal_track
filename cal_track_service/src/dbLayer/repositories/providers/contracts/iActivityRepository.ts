import {ActivityModel} from "../../../../models/activityModel";

export interface IActivityRepository {
    getActivities(): Promise<ActivityModel[]>;
    getActivityById(id: number): Promise<ActivityModel>;
}
