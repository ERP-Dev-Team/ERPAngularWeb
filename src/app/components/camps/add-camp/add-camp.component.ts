import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { DateHandler } from '../../../handlerClass/date-handler';
import { AllProjectsService } from '../../../services/project//allProject/all-projects.service';
import { AddCampsService } from '../../../services/camp/addCamp/add-camps.service';

var datehandler = new DateHandler();

@Component({
  selector: 'app-add-camp',
  templateUrl: './add-camp.component.html',
  styleUrls: ['./add-camp.component.css'],
})
export class AddCampComponent implements OnInit {
  projectList: any;
  responseGetter: any;
  statusList = ['Active', 'Inactive'];
  campForm = new FormGroup({
    name: new FormControl('', Validators.required),
    status: new FormControl('', Validators.required),
    project: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    startDate: new FormControl(''),
    endDate: new FormControl(''),
  });

  constructor(
    private apollo: Apollo,
    private route: ActivatedRoute,
    private router: Router,
    private allProjectsGQL: AllProjectsService,
    private addCampGQL: AddCampsService
  ) {
    this.allProjectsGQL
      .fetch({
        fetchPolicy: 'network-only',
      })
      .subscribe((result) => {
        this.responseGetter = result.data;
        this.projectList = this.responseGetter.projects;
      });
  }

  onSubmit() {
    console.log(this.campForm.value);
    var project = this.campForm.controls['project'].value;
    this.projectList.forEach((element) => {
      if (project == element.name) {
        project = element._id;
      }
    });

    var startDateStr = datehandler.convertDatetoTimeStamp(
      this.campForm.controls['startDate'].value
    );
    var endDateStr = datehandler.convertDatetoTimeStamp(
      this.campForm.controls['endDate'].value
    );

    this.addCampGQL
      .mutate({
        campName: this.campForm.controls['name'].value,
        project: project,
        status: this.campForm.controls['status'].value,
        address: this.campForm.controls['address'].value,
        startDate: startDateStr,
        endDate: endDateStr,
      })
      .subscribe(
        (result) => {
          this.router.navigate(['/viewCamp']);
          console.log('Success');
        },
        (error) => {
          console.log(JSON.stringify(error));
        }
      );
  }

  ngOnInit(): void {}
}
