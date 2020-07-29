import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { DateHandler } from '../../../handlerClass/date-handler';
import { EditProjectService } from './../../../services/project/editProject/edit-project.service';

var datehandler = new DateHandler();

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.css'],
})
export class EditProjectComponent implements OnInit {
  editingProjectForm: any;
  projectId: any;
  statusList = ['Open', 'Closed', 'Paused', 'Terminated'];
  projectForm = new FormGroup({
    name: new FormControl('', Validators.required),
    status: new FormControl('', Validators.required),
    startDate: new FormControl(''),
    endDate: new FormControl(''),
  });

  constructor(
    private apollo: Apollo,
    private route: ActivatedRoute,
    private router: Router,
    private editProjectGQL: EditProjectService
  ) {
    this.route.queryParams.subscribe((params) => {
      this.projectId = params._id;
      console.log(params._id);

      var sdate = datehandler.convertTimeStampToDate(params.startDate);
      var edate = datehandler.convertTimeStampToDate(params.endDate);
      this.projectForm.patchValue({
        name: params.name,
        status: params.status,
        startDate: sdate,
        endDate: edate,
      });
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    console.log(this.projectForm.value);

    var startDateStr = datehandler.convertDatetoTimeStamp(
      this.projectForm.controls['startDate'].value
    );
    var endDateStr = datehandler.convertDatetoTimeStamp(
      this.projectForm.controls['endDate'].value
    );

    this.editProjectGQL
      .mutate({
        projectId: this.projectId,
        status: this.projectForm.controls['status'].value,
        name: this.projectForm.controls['name'].value,
        startDate: startDateStr,
        endDate: endDateStr,
      })
      .subscribe(
        (result) => {
          this.router.navigate(['/viewProject']);
          console.log('Success');
        },
        (error) => {
          console.log('there was an error sending the query', error);
        }
      );
  }
}
