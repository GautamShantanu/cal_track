import {Router} from "express";
import {Route} from "../contracts/route";
import {IUserCalorieDataService} from "../../services/contracts/iUserCalorieDataService";
import {UserCalorieDataService} from "../../services/implementations/userCalorieDataService";

export class UserCalorieDataRoute implements Route{
    router: Router;
    constructor() {
        this.router = Router();
    }
    registerRoute() {
        this.router.get('/', function(req, res) {
            let calorieDataService: IUserCalorieDataService = new UserCalorieDataService();
            calorieDataService.getCalorieDataByUserId(req.query.userId.toString()).then((result) => {
                res.status(200).json(result);
            }).catch((err: any) => {
                res.status(404).json(err);
            });
        });
        this.router.post('/add', function(req, res) {
            let calorieDataService: IUserCalorieDataService = new UserCalorieDataService();
            calorieDataService.addCalorieData(req.body.userCalorieData).then((result) => {
                res.status(result.statusCode).json(result);
            }).catch((err: any) => {
                res.status(404).json(err);
            });
        });
        return this.router;
    }

}

