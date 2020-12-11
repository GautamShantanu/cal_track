import express from "express";
import { json, urlencoded } from "express";
import { join } from "path";
import { RouteFactory } from "./routes/implementations/routeFactory";
import * as config from "../config.json";
import { ROUTES } from "./routes/routeList";
import { Application } from "express";
import { Route } from "./routes/contracts/route";
import {DependencyRegistration} from "./dbLayer/repositories/providerConfigurations/dependencyRegistration";
import cors from "cors";

export class App {
    app: Application;
    routeFactory: RouteFactory;
    constructor() {
        this.app = express();
        this.routeFactory = new RouteFactory();
    }

    setViewEngine() {
        this.app.set(config.views, join(__dirname, config.views));
        this.app.set(config.viewEngine, config.viewEngineName);
    }

    configureMiddlewares() {
        this.app.use(json());
        this.app.use(urlencoded({ extended: false }));
        this.app.use(express.static(join(__dirname, config.public)));
        this.app.use(cors());
    }

    configureRouters() {
        ROUTES.forEach(value => {
            let route: Route = this.routeFactory.get(value);
            this.app.use(value.path, route.registerRoute())
        })
    }

    configureDatabase() {
        DependencyRegistration.registerDependencies();
    }

    listen(port: number) {
        this.app.listen(port);
    }

    start(port: number) {
        this.setViewEngine();
        this.configureMiddlewares();
        this.configureRouters();
        this.configureDatabase();
        this.listen(port);
    }
}

const applicationInstance: App = new App();
applicationInstance.start(config.port);

