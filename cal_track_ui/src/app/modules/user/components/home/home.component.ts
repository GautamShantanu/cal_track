import {Component, OnInit, ViewChild} from '@angular/core';
import {UserModel} from '../../../../models/user-model';
import {UserService} from '../../../../providers/user.service';
import {MatTable} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import {AddUserComponent} from '../../pop-ups/add-user/add-user.component';
import {NotificationService} from '../../../../providers/common/notification.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild(MatTable) table: MatTable<string>;
  users: UserModel[] = [];
  displayedColumns = ['id', 'name', 'gender',  'dateOfBirth', 'height', 'weight', 'operation'];
  constructor(private userService: UserService,
              private dialog: MatDialog,
              private notificationService: NotificationService,
              private router: Router) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe((users) => {
      this.users = users;
      this.renderTableRows();
    })
  }
  renderTableRows() {
    this.table.renderRows();
  }


  addUser() {
    const dialogRef = this.dialog.open(AddUserComponent);
    dialogRef.afterClosed().subscribe(user => {
      this.userService.addUsers(user).subscribe(response => {
        if(response.statusCode === 200) {
          this.addUserToTable(user);
          this.notificationService.success(`Added the user ${user.name}`);
        }
        else {
          this.notificationService.error('Error adding user. Please try again');
        }
      })
    });
  }

  private addUserToTable(user: UserModel) {
    user.id = Number(this.users[this.users.length - 1].id) + 1;
    this.users.push(user);
    this.renderTableRows();
  }

  deleteUser(id: number) {
    this.userService.deleteUser(id).subscribe(response => {
      if(response.statusCode === 200) {
        this.deleteUserFromTable(id);
        this.notificationService.success('User successfully deleted.')
      } else {
        this.notificationService.error('Error deleting user. Please try again');
      }
    })
  }

  private deleteUserFromTable(id: number) {
    let index = this.users.findIndex(user => (user.id === id));
    this.users.splice(index, 1);
    this.renderTableRows();
  }

  showCalorieData(id: number) {
    console.log('userId:', id);
    this.router.navigate([`calorieDetails/${id}`]);
  }
}
