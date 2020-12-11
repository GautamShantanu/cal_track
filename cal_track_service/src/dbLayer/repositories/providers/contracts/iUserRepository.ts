import {UserModel} from "../../../../models/userModel";
import {DeleteWriteOpResultObject, InsertOneWriteOpResult} from "mongodb";

export interface IUserRepository {
    getUsers(): Promise<UserModel[]>;
    addUser(user: UserModel): Promise<any>;
    deleteUserById(id: string): Promise<DeleteWriteOpResultObject>;
    getLastAddedUser(): Promise<any>;
    getUserById(id: string): Promise<UserModel>;
}
