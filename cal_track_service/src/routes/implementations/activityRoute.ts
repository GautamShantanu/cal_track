import {Router} from "express";
import {Route} from "../contracts/route";
import {IActivityService} from "../../services/contracts/iActivityService";
import {ActivityService} from "../../services/implementations/activityService";

export class ActivityRoute implements Route{
    router: Router;
    constructor() {
        this.router = Router();
    }
    registerRoute() {
        this.router.get('/getAll', function(req, res) {
            let activityService: IActivityService = new ActivityService();
            activityService.getActivities().then((result) => {
                res.status(200).json(result);
            }).catch((err: any) => {
                res.status(404).json(err);
            });
        });
        this.router.get('/', function(req, res) {
            let activityService: IActivityService = new ActivityService();
            activityService.getActivityById(Number(req.query.id)).then((result) => {
                res.status(200).json(result);
            }).catch((err: any) => {
                res.status(404).json(err);
            });
        });
        return this.router;
    }

}

