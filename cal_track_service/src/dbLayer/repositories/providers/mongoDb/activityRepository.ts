import {Collection, Db} from "mongodb";
import {IConnectionManager} from "../../../connectionManagers/iConnectionManager";
import {DependencyContainer} from "../../providerConfigurations/dependencyContainer";
import {RepositoryName} from "../../../enums/repositoryName";
import {IActivityRepository} from "../contracts/iActivityRepository";
import {ActivityModel} from "../../../../models/activityModel";

export class ActivityRepository implements IActivityRepository{
    private static collection: Collection<ActivityModel> = null;

    async getCollection() {
        if (!ActivityRepository.collection) {
            let connection: IConnectionManager = DependencyContainer.Instance.getConnectionManager();
            let dbInstance: Db = await connection.getConnection();
            ActivityRepository.collection = await dbInstance.collection(RepositoryName.Activity);
        }
    }

    async getActivities(): Promise<ActivityModel[]>{
        await this.getCollection();
        return await ActivityRepository.collection.find().toArray();
    }

    async getActivityById(id: number): Promise<ActivityModel>{
        await this.getCollection();
        return await ActivityRepository.collection.findOne({id});
    }
}
