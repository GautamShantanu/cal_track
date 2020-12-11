import {RepositorySet} from "./providerConfigurations/repositorySet";
import {DbManagerName} from "../enums/dbManagerName";
import {RepositoryName} from "../enums/repositoryName";
import {UserRepository} from "./providers/mongoDb/userRepository";
import {ActivityRepository} from "./providers/mongoDb/activityRepository";
import {FoodCalorieRepository} from "./providers/mongoDb/foodCalorieRepository";
import {UserCalorieDataRepository} from "./providers/mongoDb/userCalorieDataRepository";

export const RepositoryList: RepositorySet[] = [
    {
        repositoryName: RepositoryName.User,
        dbManagerName: DbManagerName.MongoDb,
        repositoryHandler: UserRepository
    },
    {
        repositoryName: RepositoryName.Activity,
        dbManagerName: DbManagerName.MongoDb,
        repositoryHandler: ActivityRepository
    },
    {
        repositoryName: RepositoryName.FoodCalorie,
        dbManagerName: DbManagerName.MongoDb,
        repositoryHandler: FoodCalorieRepository
    },
    {
        repositoryName: RepositoryName.UserCalorieData,
        dbManagerName: DbManagerName.MongoDb,
        repositoryHandler: UserCalorieDataRepository
    }
]
