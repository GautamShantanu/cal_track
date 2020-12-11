import * as config from "./../../../config.json";
import {IConnectionManager} from "./iConnectionManager";
import {Db, MongoClient} from "mongodb";

let dbConfig = config.dbConfig;

export class MongoDbManager implements IConnectionManager{
    private dbConnections: { dbUrl: string, db: Db }[];
    private static instance: MongoDbManager;

    private constructor() {
        this.dbConnections = [];
    }

    getConnection(): Promise<any> {
        return this.getDbConnection(dbConfig.mongoDb.defaultDb).catch((err) => {
            console.error(err);
            return { message: "Missing Configuration or Connection Error" };
        });
    }

    private async getDbConnection(url: string): Promise<any> {
        let dbConnection: { dbUrl: string, db: Db } = null;
        dbConnection = (this.dbConnections.filter(connection => connection.dbUrl === url))[0];
        if (dbConnection && dbConnection.db) {
            return dbConnection.db;
        } else {
            let client: MongoClient = await MongoClient.connect(url, { useUnifiedTopology: true });
            let urlParts = url.split("/");
            dbConnection = {
                dbUrl: url, db: client.db(urlParts[urlParts.length - 1])
            }
            this.dbConnections.push(dbConnection);
            return dbConnection.db;
        }
    }

    static get Instance() {
        if (!this.instance) {
            this.instance = new MongoDbManager();
        }
        return this.instance;
    }
}
