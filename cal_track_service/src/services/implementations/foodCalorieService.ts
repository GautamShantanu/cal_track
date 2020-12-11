import {DependencyContainer} from "../../dbLayer/repositories/providerConfigurations/dependencyContainer";
import {RepositoryName} from "../../dbLayer/enums/repositoryName";
import {IFoodCalorieService} from "../contracts/iFoodCalorieService";
import {IFoodCalorieRepository} from "../../dbLayer/repositories/providers/contracts/iFoodCalorieRepository";

export class FoodCalorieService implements IFoodCalorieService {
    constructor() {
    }

    getAllFoodCalories() {
        let foodCalorieRepository: IFoodCalorieRepository =
            DependencyContainer.Instance.resolveRepository(RepositoryName.FoodCalorie);
        return foodCalorieRepository.getAllFoodCalories().then((result) => {
            if (!result) {
                return {message: "Data not found"};
            } else
                return result;
        }).catch((err) => {
            console.error(err);
            return {message: "Error fetching data"};
        });
    }

    getFoodCaloriesById(id: number) {
        let foodCalorieRepository: IFoodCalorieRepository =
            DependencyContainer.Instance.resolveRepository(RepositoryName.FoodCalorie);
        return foodCalorieRepository.getFoodCaloriesById(id).then((result) => {
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
