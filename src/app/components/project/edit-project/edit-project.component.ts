import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { DateHandler } from '../../../handlerClass/date-handler';

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
    private router: Router
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

    var status = this.projectForm.controls['status'].value;
    var EDIT_PROJECT = gql`
      mutation editProjectFunction(
        $status: String!
        $projectId: ID!
        $name: String!
        $startDate: String!
        $endDate: String!
      ) {
        updateProject(
          _id: $projectId
          status: $status
          name: $name
          startDate: $startDate
          endDate: $endDate
        ) {
          name
          status
          startDate
          endDate
        }
      }
    `;
    this.apollo
      .mutate({
        mutation: EDIT_PROJECT,
        variables: {
          projectId: this.projectId,
          status: status,
          name: this.projectForm.controls['name'].value,
          startDate: startDateStr,
          endDate: endDateStr,
        },
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
