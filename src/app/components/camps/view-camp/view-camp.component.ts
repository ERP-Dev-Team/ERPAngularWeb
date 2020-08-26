import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Router, ActivatedRoute } from '@angular/router';
import { AllCampsService } from '../../../services/camp/allCamp/all-camps.service';

@Component({
  selector: 'app-view-camp',
  templateUrl: './view-camp.component.html',
  styleUrls: ['./view-camp.component.css'],
})
export class ViewCampComponent implements OnInit {
  lable: any;
  campList: any;
  responseGetter: any;
  constructor(
    private apollo: Apollo,
    private route: ActivatedRoute,
    private router: Router,
    private allCampsGQL: AllCampsService
  ) {
    this.allCampsGQL
      .fetch({
        fetchPolicy: 'network-only',
      })
      .subscribe((result) => {
        this.responseGetter = result.data;
        this.campList = this.responseGetter.camps;
      });
  }

  onCampEdit(camp: any) {
    this.router.navigate(['/editCamp'], {
      queryParams: { pID: camp._id },
      skipLocationChange: true,
    });
    console.log(camp._id);
  }

  navigativeToAddCamp() {
    this.router.navigate(['/addCamp']);
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.lable = params;
    });
  }

  public getDateFromTimestamp(args) {
    try {
      return new Date(Number.parseInt(args)).toISOString().substring(0, 10);
    } catch (err) {
      return '';
    }
  }
}
