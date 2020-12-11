import {DbManagerSet} from "./DbManagerSet";
import {RepositorySet} from "./repositorySet";
import {DbManagerName} from "../../enums/dbManagerName";
import * as config from "./../../../../config.json";
import {RepositoryName} from "../../enums/repositoryName";
import {DbLayerErrorCodes} from "../../constants/dbLayerErrorCodes";

export class DependencyContainer {
    private static instance: DependencyContainer;
    dbConfig = config.dbConfig;

    public repositorySets: RepositorySet[] = [];
    public dbManagerSets: DbManagerSet[] = [];

    registerRepository(repositoryName: RepositoryName, dbManagerName: DbManagerName, repositoryHandler: any) {
        let registeredIndex = this.repositorySets.findIndex( repositorySet =>
            repositorySet.repositoryName === repositoryName);
        if (registeredIndex === -1) {
            this.repositorySets.push(new RepositorySet(repositoryName, dbManagerName, repositoryHandler));
        }
    }

    registerDbManager(provider: DbManagerName, dbManagerHandler: any) {
        let registeredIndex = this.dbManagerSets.findIndex( dbManagerSet =>
            dbManagerSet.dbManagerName === provider);
        if (registeredIndex === -1) {
            this.dbManagerSets.push(new DbManagerSet(provider, dbManagerHandler));
        }
    }

    resolveRepository(repositoryName: RepositoryName, dbManagerName?: DbManagerName) {
        if (!dbManagerName) {
            dbManagerName = DbManagerName[this.dbConfig.defaultDbProvider];
        }
        let repositorySet: RepositorySet = this.repositorySets.filter(repositorySet =>
            (repositorySet.dbManagerName === dbManagerName && repositorySet.repositoryName===repositoryName))[0];
        if (repositorySet && repositorySet.repositoryHandler) {
            return new repositorySet.repositoryHandler();
        } else {
          return DbLayerErrorCodes.UNABLE_TO_RESOLVE_DEPENDENCY;
        }
    }

    public getConnectionManager(dbManagerName?: DbManagerName) {
        if (!dbManagerName) {
            dbManagerName = DbManagerName[this.dbConfig.defaultDbProvider];
        }
        let dbManagerSet : DbManagerSet = this.dbManagerSets.filter(dbManager =>
            (dbManager.dbManagerName===dbManagerName)
        )[0];
        if (dbManagerSet && dbManagerSet.handler) {
            return dbManagerSet.handler.Instance;
        } else {
            return DbLayerErrorCodes.UNRECOGNIZED_CONNECTION_TYPE;
        }
    }

    static get Instance() {
        if (!this.instance) {
            this.instance = new DependencyContainer();
        }
        return this.instance;
    }
}
