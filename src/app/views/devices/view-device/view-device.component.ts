import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { ViewDeviceService } from '../../../services/device/view-device/view-device.service';
@Component({
  selector: 'app-view-device',
  templateUrl: './view-device.component.html',
  styleUrls: ['./view-device.component.css']
})
export class ViewDeviceComponent implements OnInit {

  devicesList: any;
  private res: any;

  constructor(
    private apollo: Apollo,
    private route: ActivatedRoute,
    private router: Router,
    private viewDevice: ViewDeviceService
  ) {
    this.viewDevice
      .fetch({
        fetchPolicy: 'network-only',
      })
      .subscribe((result) => {
        this.res = result.data;
        this.devicesList = this.res.devices;
      });
  }

  ngOnInit(): void {
  }
  navigativeToAddDevice() {
    this.router.navigate(['/addDevice']);
  }
}
