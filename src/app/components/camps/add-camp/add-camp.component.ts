import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { DateHandler } from '../../../handlerClass/date-handler';

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
    private router: Router
  ) {
    this.apollo
      .query({
        query: gql`
          {
            projects {
              _id
              name
              status
              startDate
              endDate
              createdAt
              updatedAt
            }
          }
        `,
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

    var CREATE_CAMP = gql`
      mutation createCampFunction(
        $campName: String!
        $status: String!
        $startDate: String
        $endDate: String
        $project: ID!
        $address: String
      ) {
        createCamp(
          campInput: {
            name: $campName
            status: $status
            project: $project
            address: $address
            startDate: $startDate
            endDate: $endDate
          }
        ) {
          name
          status
        }
      }
    `;

    this.apollo
      .mutate({
        mutation: CREATE_CAMP,
        variables: {
          campName: this.campForm.controls['name'].value,
          project: project,
          status: this.campForm.controls['status'].value,
          address: this.campForm.controls['address'].value,
          startDate: startDateStr,
          endDate: endDateStr,
        },
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
