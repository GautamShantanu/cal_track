import { RouteConfig } from "./contracts/routeConfig";
import { UserRoute } from "./implementations/userRoute";
import {ActivityRoute} from "./implementations/activityRoute";
import {FoodCalorieRoute} from "./implementations/foodCalorieRoute";
import {UserCalorieDataRoute} from "./implementations/userCalorieDataRoute";
export const ROUTES: RouteConfig[] = [
    {
        path: '/user',
        handler: UserRoute
    },
    {
        path: '/activity',
        handler: ActivityRoute
    },
    {
        path: '/foodCalorie',
        handler: FoodCalorieRoute
    },
    {
        path: '/calorieData',
        handler: UserCalorieDataRoute
    }
]
