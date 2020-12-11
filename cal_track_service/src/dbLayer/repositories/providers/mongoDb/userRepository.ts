import {IUserRepository} from "../contracts/iUserRepository";
import {UserModel} from "../../../../models/userModel";
import {Collection, Db, DeleteWriteOpResultObject, InsertOneWriteOpResult} from "mongodb";
import {IConnectionManager} from "../../../connectionManagers/iConnectionManager";
import {DependencyContainer} from "../../providerConfigurations/dependencyContainer";
import {RepositoryName} from "../../../enums/repositoryName";

export class UserRepository implements IUserRepository{
    private static collection: Collection<UserModel> = null;

    async getCollection() {
        if (!UserRepository.collection) {
            let connection: IConnectionManager = DependencyContainer.Instance.getConnectionManager();
            let dbInstance: Db = await connection.getConnection();
            UserRepository.collection = await dbInstance.collection(RepositoryName.User);
        }
    }

    async getUsers(): Promise<UserModel[]>{
        await this.getCollection();
        return await UserRepository.collection.find().toArray();
    }

    async addUser(user: UserModel): Promise<any>{
        if (!user.id) {
            return null;
        }
        await this.getCollection();
        return UserRepository.collection.updateOne({id: user.id},{$set: user}, {upsert: true});
    }

    async getLastAddedUser(): Promise<any> {
        await this.getCollection();
        return  UserRepository.collection.find().sort( { _id : -1 } ).limit(1).toArray();
    }

    async deleteUserById(userId: string): Promise<DeleteWriteOpResultObject>{
        await this.getCollection();
        return await UserRepository.collection.deleteOne({id: userId});
    }

    async getUserById(id: string): Promise<UserModel>{
        await this.getCollection();
        return await UserRepository.collection.findOne({id: id});
    }
}
