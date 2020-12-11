import {RouteConfig} from "../contracts/routeConfig";

export class RouteFactory{
    constructor() {
    }

    get(route: RouteConfig) {
        return new route.handler();
    }
}
