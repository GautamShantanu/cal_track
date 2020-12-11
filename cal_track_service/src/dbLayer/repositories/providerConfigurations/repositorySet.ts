import {DbManagerName} from "../../enums/dbManagerName";
import {RepositoryName} from "../../enums/repositoryName";

export class RepositorySet {
    repositoryName: RepositoryName;
    dbManagerName: DbManagerName;
    repositoryHandler: any;
    constructor(repositoryName: RepositoryName, dbManagerName: DbManagerName, repositoryHandler: any) {
        this.repositoryName = repositoryName;
        this.dbManagerName = dbManagerName;
        this.repositoryHandler = repositoryHandler
    }
}
