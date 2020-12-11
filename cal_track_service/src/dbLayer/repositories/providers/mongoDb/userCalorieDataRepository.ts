import {Collection, Db, InsertOneWriteOpResult} from "mongodb";
import {IConnectionManager} from "../../../connectionManagers/iConnectionManager";
import {DependencyContainer} from "../../providerConfigurations/dependencyContainer";
import {RepositoryName} from "../../../enums/repositoryName";
import {IUserCalorieDataRepository} from "../contracts/iUserCalorieDataRepository";
import {UserCalorieDataModel} from "../../../../models/userCalorieDataModel";

export class UserCalorieDataRepository implements IUserCalorieDataRepository{
    private static collection: Collection<UserCalorieDataModel> = null;

    async getCollection() {
        if (!UserCalorieDataRepository.collection) {
            let connection: IConnectionManager = DependencyContainer.Instance.getConnectionManager();
            let dbInstance: Db = await connection.getConnection();
            UserCalorieDataRepository.collection = await dbInstance.collection(RepositoryName.UserCalorieData);
        }
    }

    async getNetCalorieDataByUserId(userId:string): Promise<UserCalorieDataModel[]>{
        await this.getCollection();
        return UserCalorieDataRepository.collection.find({userId}).toArray();
    }

    async addCalorieData(calorieData: UserCalorieDataModel){
        await this.getCollection();
        return UserCalorieDataRepository.collection
            .updateOne({userId: calorieData.userId, date: calorieData.date},
                {
                    $addToSet: { foodConsumed: { $each : calorieData.foodConsumed },
                        activitiesPerformed: {$each: calorieData.activitiesPerformed} },
                    $inc: {caloriesIn: calorieData.caloriesIn, caloriesOut: calorieData.caloriesOut}
                    },
                {upsert: true} );
    }
}
