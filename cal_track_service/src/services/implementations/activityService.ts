import {DependencyContainer} from "../../dbLayer/repositories/providerConfigurations/dependencyContainer";
import {RepositoryName} from "../../dbLayer/enums/repositoryName";
import {IActivityService} from "../contracts/iActivityService";
import {IActivityRepository} from "../../dbLayer/repositories/providers/contracts/iActivityRepository";

export class ActivityService implements IActivityService {
    constructor() {
    }

    getActivities() {
        let activityRepository: IActivityRepository =
            DependencyContainer.Instance.resolveRepository(RepositoryName.Activity);
        return activityRepository.getActivities().then((result) => {
            if (!result) {
                return {message: "Data not found"};
            } else
                return result;
        }).catch((err) => {
            console.error(err);
            return {message: "Error fetching data"};
        });
    }

    getActivityById(id: number) {
        let activityRepository: IActivityRepository =
            DependencyContainer.Instance.resolveRepository(RepositoryName.Activity);
        return activityRepository.getActivityById(id).then((result) => {
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
