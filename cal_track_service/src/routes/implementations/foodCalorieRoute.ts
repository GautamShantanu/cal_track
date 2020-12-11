import {Router} from "express";
import {Route} from "../contracts/route";
import {IFoodCalorieService} from "../../services/contracts/iFoodCalorieService";
import {FoodCalorieService} from "../../services/implementations/foodCalorieService";

export class FoodCalorieRoute implements Route{
    router: Router;
    constructor() {
        this.router = Router();
    }
    registerRoute() {
        this.router.get('/getAll', function(req, res) {
            let foodCalorieService: IFoodCalorieService = new FoodCalorieService();
            foodCalorieService.getAllFoodCalories().then((result) => {
                res.status(200).json(result);
            }).catch((err: any) => {
                res.status(404).json(err);
            });
        });
        this.router.get('/', function(req, res) {
            let foodCalorieService: IFoodCalorieService = new FoodCalorieService();
            foodCalorieService.getFoodCaloriesById(Number(req.query.id)).then((result) => {
                res.status(200).json(result);
            }).catch((err: any) => {
                res.status(404).json(err);
            });
        });
        return this.router;
    }

}

