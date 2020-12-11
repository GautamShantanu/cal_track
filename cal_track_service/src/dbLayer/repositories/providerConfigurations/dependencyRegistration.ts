import {RepositoryList} from "../repositoryList";
import {DependencyContainer} from "./dependencyContainer";
import {DbManagerList} from "../dbManagerList";

export class DependencyRegistration {

    public static registerDependencies() {
        this.registerRepositories();
        this.registerDbManagers();
    }
    private static registerRepositories() {
        RepositoryList.forEach(dependency => {
            DependencyContainer.Instance.registerRepository(dependency.repositoryName,
                dependency.dbManagerName, dependency.repositoryHandler);
        });
    }
    private static registerDbManagers() {
        DbManagerList.forEach(dependency => {
            DependencyContainer.Instance.registerDbManager(
                dependency.dbManagerName, dependency.handler);
        });
    }


}
