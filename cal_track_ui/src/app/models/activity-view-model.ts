export class ActivityViewModel {
  id: number;
  activity: string;
  motion: string;
  mets: number;
  duration: number;
  netCaloriesBurned: number;

  constructor() {
    this.duration = 0;
    this.netCaloriesBurned = 0;
  }
}
