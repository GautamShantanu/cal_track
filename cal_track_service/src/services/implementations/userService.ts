import {IUserRepository} from "../../dbLayer/repositories/providers/contracts/iUserRepository";
import {DependencyContainer} from "../../dbLayer/repositories/providerConfigurations/dependencyContainer";
import {RepositoryName} from "../../dbLayer/enums/repositoryName";
import {UserModel} from "../../models/userModel";
import {IUserService} from "../contracts/iUserService";
import {StatusCode} from "../../constants/statusCode";

export class UserService implements IUserService {
    constructor() {
    }

    getUsers() {
        let userRepository: IUserRepository = DependencyContainer.Instance.resolveRepository(RepositoryName.User);
        return userRepository.getUsers().then((result) => {
            if (!result) {
                return {message: "Data not found"};
            } else
                return result;
        }).catch((err) => {
            console.error(err);
            return {message: "Error fetching data"};
        });
    }

    addUser(user: UserModel): Promise<{statusCode: number, message: string}> {
        let userRepository: IUserRepository = DependencyContainer.Instance.resolveRepository(RepositoryName.User);
        return  userRepository.getLastAddedUser().then((result) => {
            user.id = (Number(result[0].id) + 1).toString();
        }).then( () =>{
            return userRepository.addUser(user).then((result) => {
                if (!result || result.insertedCount < 1) {
                    return {statusCode: StatusCode.SERVER_ERROR, message: "Unable to Save User"};
                } else {
                    return {statusCode: StatusCode.OKAY, message: "User Saved Successfully"};
                }
            })
        }).catch((err) => {
            console.log(err);
            return {statusCode: StatusCode.SERVER_ERROR, message: "Unable to Save User"};
        });
    }

    deleteUserById(id: string): Promise<{statusCode: number, message: string}> {
        let userRepository: IUserRepository = DependencyContainer.Instance.resolveRepository(RepositoryName.User);
        return userRepository.deleteUserById(id).then((result) => {
            if (!result || result.deletedCount < 1) {
                return {statusCode: StatusCode.SERVER_ERROR, message: "Unable to Delete User"};
            } else
                return {statusCode: StatusCode.OKAY, message: "Deleted User Successfully"};
        }).catch((err) => {
            return {statusCode: StatusCode.SERVER_ERROR, message: "Unable to Delete User"};
        });
    }

    getUserById(id: string) {
        let userRepository: IUserRepository = DependencyContainer.Instance.resolveRepository(RepositoryName.User);
        return userRepository.getUserById(id).then((result) => {
            if (!result) {
                return {message: "Data not found"};
            } else
                return result;
        }).catch((err) => {
            console.error(err);
            return {message: "Error fetching data"};
        });
    }
}
