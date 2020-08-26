import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AddDeviceService } from '../../../services/device/add-device/add-device.service';
import { ViewUserService } from '../../../services/users/view-user/view-user.service';

@Component({
  selector: 'app-add-device',
  templateUrl: './add-device.component.html',
  styleUrls: ['./add-device.component.css']
})
export class AddDeviceComponent implements OnInit {
  public devicesList: any;
  public usersList: any;
  private res: any;
  deviceForm: FormGroup;

  constructor(
    private router: Router,
    private addDeviceGQL: AddDeviceService,
    private viewUsersGQL : ViewUserService
  ) {
    this.viewUsersGQL.fetch({
      fetchPolicy: 'network-only',
    })
    .subscribe((result) => {
      this.usersList = result.data['users'];
    });
  }

  ngOnInit(): void {
    this.deviceForm = new FormGroup({
      make: new FormControl('', Validators.required),
      model: new FormControl('', Validators.required),
      cellNumber: new FormControl('', Validators.required),
      IMEI: new FormControl('', Validators.required),
      userAssigned: new FormControl('', Validators.required),
    });
  }

  addDevice() {
    console.log(this.deviceForm.value);
    this.addDeviceGQL
      .mutate({
        make: this.deviceForm.controls['make'].value,
        model: this.deviceForm.controls['model'].value,
        cellNumber: this.deviceForm.controls['cellNumber'].value,
        IMEI: this.deviceForm.controls['IMEI'].value,
        userAssigned: this.deviceForm.controls['userAssigned'].value,
      })
      .subscribe(
        (result) => {
          this.router.navigate(['/viewDevices']);
        },
        (error) => {
          console.log(JSON.stringify(error));
        }
      );
  }
}
