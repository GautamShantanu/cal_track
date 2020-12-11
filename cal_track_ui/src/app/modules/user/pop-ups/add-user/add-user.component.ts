import { Component, OnInit } from '@angular/core';
import {GenderEnum} from '../../../../enums/gender-enum';
import {UserModel} from '../../../../models/user-model';
import {UtilityService} from '../../../../providers/common/utility.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  user: UserModel = new UserModel();
  sexCategories: { key: string, value: string }[];
  maxDate: Date;
  minDate: Date;
  constructor(private utilityService: UtilityService) {
  }

  ngOnInit(): void {
    this.initializeDates();
    this.initializeSexCategories();
  }

  isUserValid() {
    return this.user.name && this.user.weight && this.user.height && this.user.sex;
  }

  private initializeSexCategories() {
    this.sexCategories = this.utilityService.enumSelector(GenderEnum);
  }

  private initializeDates() {
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 100, 0, 1);
    this.maxDate = new Date(currentYear - 1, 11, 31);
  }
}
