import {Injectable} from '@angular/core';
import {HttpService} from './common/http.service';
import {Observable} from 'rxjs';
import {UserModel} from '../models/user-model';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private getAllUsersApi = 'user/getAll';
  private getUserByIdApi = 'user/get';
  private addApi = 'user/add';
  private deleteApi = 'user/delete';
  currentUser: UserModel;

  constructor(private httpService: HttpService) { }

  getUsers(): Observable<UserModel[]> {
    return this.httpService.get(`${environment.calTrackServiceUrl}/${this.getAllUsersApi}`);
  }

  getUserById(id: number): Observable<UserModel> {
    return this.httpService.get(`${environment.calTrackServiceUrl}/${this.getUserByIdApi}?id=${id}`);
  }

  addUsers(user: UserModel): Observable<any> {
    return this.httpService.post(`${environment.calTrackServiceUrl}/${this.addApi}`, {user});
  }

  deleteUser(id: number): Observable<{ statusCode: number, message: string }> {
    return this.httpService.get(`${environment.calTrackServiceUrl}/${this.deleteApi}?id=${id}`);
  }

  getCurrentUser() {
    return this.currentUser;
  }

  setCurrentUser(user: UserModel) {
    this.currentUser = user;
  }

  getAgeOfUser(user: UserModel) {
    if(user) {
      let timeDiff = Math.abs(Date.now() - new Date(user.dateOfBirth).getTime());
      return Math.floor((timeDiff / (1000 * 3600 * 24)) / 365.25);
    }
  }
}
