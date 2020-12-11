import {DbManagerSet} from "./providerConfigurations/DbManagerSet";
import {DbManagerName} from "../enums/dbManagerName";
import {MongoDbManager} from "../connectionManagers/MongoDbManager";

export const DbManagerList: DbManagerSet[] = [
    {
        dbManagerName: DbManagerName.MongoDb,
        handler: MongoDbManager
    }
]
