import {DependencyContainer} from "../../dbLayer/repositories/providerConfigurations/dependencyContainer";
import {RepositoryName} from "../../dbLayer/enums/repositoryName";
import {StatusCode} from "../../constants/statusCode";
import {IUserCalorieDataService} from "../contracts/iUserCalorieDataService";
import {IUserCalorieDataRepository} from "../../dbLayer/repositories/providers/contracts/iUserCalorieDataRepository";
import {UserCalorieDataModel} from "../../models/userCalorieDataModel";

export class UserCalorieDataService implements IUserCalorieDataService {
    constructor() {
    }

    getCalorieDataByUserId(userId:string) {
        let calorieDataRepository: IUserCalorieDataRepository = DependencyContainer.Instance
            .resolveRepository(RepositoryName.UserCalorieData);
        return calorieDataRepository.getNetCalorieDataByUserId(userId).then((result) => {
            if (!result) {
                return {message: "Data not found"};
            } else
                return result;
        }).catch((err) => {
            console.error(err);
            return {message: "Error fetching data"};
        });
    }

    addCalorieData(userCalorieData: UserCalorieDataModel): Promise<{statusCode: number, message: string}> {
        let calorieDataRepository: IUserCalorieDataRepository = DependencyContainer.Instance
            .resolveRepository(RepositoryName.UserCalorieData);
        return calorieDataRepository.addCalorieData(userCalorieData).then((result) => {
            if (!result || result.insertedCount < 1) {
                return {statusCode: StatusCode.SERVER_ERROR, message: "Unable to Save User"};
            } else {
                return {statusCode: StatusCode.OKAY, message: "User Saved Successfully"};
            }
        }).catch((err) => {
            console.log(err);
            return {statusCode: StatusCode.SERVER_ERROR, message: "Unable to Save User"};
        });
    }
}
