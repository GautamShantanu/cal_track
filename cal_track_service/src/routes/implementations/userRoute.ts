import {Router} from "express";
import {Route} from "../contracts/route";
import {UserService} from "../../services/implementations/userService";
import {IUserService} from "../../services/contracts/iUserService";

export class UserRoute implements Route{
    router: Router;
    constructor() {
        this.router = Router();
    }
    registerRoute() {
        this.router.get('/getAll', function(req, res) {
            let userService: IUserService = new UserService();
            userService.getUsers().then((result) => {
                res.status(200).json(result);
            }).catch((err: any) => {
                res.status(404).json(err);
            });
        });
        this.router.get('/get', function(req, res) {
            let userService: IUserService = new UserService();
            userService.getUserById(req.query.id.toString()).then((result) => {
                res.status(200).json(result);
            }).catch((err: any) => {
                res.status(404).json(err);
            });
        });
        this.router.post('/add', function(req, res) {
            let userService: IUserService = new UserService();
            userService.addUser(req.body.user).then((result) => {
                res.status(result.statusCode).json(result);
            }).catch((err: any) => {
                res.status(404).json(err);
            });
        });
        this.router.get('/delete', function(req, res) {
            let userService: IUserService = new UserService();
            userService.deleteUserById(req.query.id.toString()).then((result) => {
                res.status(result.statusCode).json(result);
            }).catch((err: any) => {
                res.status(404).json(err);
            });
        });
        return this.router;
    }

}

