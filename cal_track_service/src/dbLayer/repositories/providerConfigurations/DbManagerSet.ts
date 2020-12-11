import {DbManagerName} from "../../enums/dbManagerName";

export class DbManagerSet {
    public dbManagerName: DbManagerName;
    public handler: any;

    constructor(dbManagerName: DbManagerName, handler: any) {
        this.dbManagerName = dbManagerName;
        this.handler = handler;
    }
}
