import {Collection, Db} from "mongodb";
import {IConnectionManager} from "../../../connectionManagers/iConnectionManager";
import {DependencyContainer} from "../../providerConfigurations/dependencyContainer";
import {RepositoryName} from "../../../enums/repositoryName";
import {FoodCalorieModel} from "../../../../models/foodCalorieModel";
import {IFoodCalorieRepository} from "../contracts/iFoodCalorieRepository";

export class FoodCalorieRepository implements IFoodCalorieRepository{
    private static collection: Collection<FoodCalorieModel> = null;

    async getCollection() {
        if (!FoodCalorieRepository.collection) {
            let connection: IConnectionManager = DependencyContainer.Instance.getConnectionManager();
            let dbInstance: Db = await connection.getConnection();
            FoodCalorieRepository.collection = await dbInstance.collection(RepositoryName.FoodCalorie);
        }
    }

    async getAllFoodCalories(): Promise<FoodCalorieModel[]>{
        await this.getCollection();
        return await FoodCalorieRepository.collection.find().toArray();
    }

    async getFoodCaloriesById(id: number): Promise<FoodCalorieModel>{
        await this.getCollection();
        return await FoodCalorieRepository.collection.findOne({id});
    }
}
