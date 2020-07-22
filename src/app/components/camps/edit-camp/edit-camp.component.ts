import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { DateHandler } from '../../../handlerClass/date-handler';

var datehandler = new DateHandler();

@Component({
  selector: 'app-edit-camp',
  templateUrl: './edit-camp.component.html',
  styleUrls: ['./edit-camp.component.css'],
})
export class EditCampComponent implements OnInit {
  responseForm: any;
  projectList: any;
  private campId: any;
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
    this.getProjectsList();
  }

  onSubmit() {
    console.log(this.campForm.value);

    var startDateStr = datehandler.convertDatetoTimeStamp(
      this.campForm.controls['startDate'].value
    );
    var endDateStr = datehandler.convertDatetoTimeStamp(
      this.campForm.controls['endDate'].value
    );

    var EDIT_CAMP = gql`
      mutation editCampFunction(
        $campName: String!
        $status: String!
        $startDate: String!
        $endDate: String!
        $project: ID!
        $campId: ID!
        $address: String
      ) {
        updateCamp(
          _id: $campId
          name: $campName
          status: $status
          project: $project
          startDate: $startDate
          endDate: $endDate
          address: $address
        ) {
          name
          status
          project {
            name
            status
            startDate
            endDate
            createdAt
            updatedAt
          }
          startDate
          endDate
        }
      }
    `;

    this.apollo
      .mutate({
        mutation: EDIT_CAMP,
        variables: {
          campName: this.campForm.controls['name'].value,
          project: this.campForm.controls['project'].value,
          status: this.campForm.controls['status'].value,
          startDate: startDateStr,
          endDate: endDateStr,
          campId: this.campId,
          address: this.campForm.controls['address'].value,
        },
      })
      .subscribe(
        (result) => {
          this.router.navigate(['/viewCamp']);
          console.log('Success');
          console.log(result)
        },
        (error) => {
          console.log(JSON.stringify(error));
        }
      );
  }

  /** Get Project List to display the available projects */
  private getProjectsList() {
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

  private getCampDetailsForEdit() {
    this.route.queryParams.subscribe((params) => {
      this.campId = params['pID'];
      console.log('This is the id ' + this.campId);
      this.queryBasedOnId();
    });
  }

  private queryBasedOnId() {
    this.apollo
      .query({
        query: gql`
          query getCampById($campId: ID!) {
            camp(_id: $campId) {
              _id
              name
              status
              address
              startDate
              endDate
              createdAt
              updatedAt
              project {
                _id
                name
                status
                startDate
                endDate
                createdAt
                updatedAt
              }
            }
          }
        `,
        variables: {
          campId: this.campId,
        },
      })
      .subscribe((result) => {
        this.responseGetter = result.data;
        var startdate = datehandler.convertTimeStampToDate(
          this.responseGetter.camp.startDate
        );
        var enddate = datehandler.convertTimeStampToDate(
          this.responseGetter.camp.endDate
        );

        this.campForm.patchValue({
          name: this.responseGetter.camp.name,
          status: this.responseGetter.camp.status,
          address: this.responseGetter.camp.address,
          project: this.responseGetter.camp.project._id,
          startDate: startdate,
          endDate: enddate,
        });
      });
  }


  ngOnInit(): void {
    this.getCampDetailsForEdit();
    
  }
}
