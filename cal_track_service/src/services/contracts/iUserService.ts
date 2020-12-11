import {UserModel} from "../../models/userModel";

export interface IUserService {
    getUsers();
    addUser(user: UserModel);
    deleteUserById(id: string);
    getUserById(id: string);
}
