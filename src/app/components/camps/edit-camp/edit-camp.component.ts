import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

@Component({
  selector: 'app-edit-camp',
  templateUrl: './edit-camp.component.html',
  styleUrls: ['./edit-camp.component.css'],
})
export class EditCampComponent implements OnInit {
  responseForm: any;
  projectList: any;
  private campId: any;
  private projectId: String;
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
    var startDate = this.campForm.controls['startDate'].value;
    var endDate = this.campForm.controls['endDate'].value;
    startDate = '' + new Date(startDate).getTime();
    endDate = '' + new Date(endDate).getTime();

    var EDIT_CAMP = gql`
      mutation editCampFunction(
        $campName: String!
        $status: String!
        $startDate: String!
        $endDate: String!
        $project: ID!
        $campId: ID!
      ) {
        updateCamp(
          _id: $campId
          name: $campName
          status: $status
          project: $project
          startDate: $startDate
          endDate: $endDate
        ) {
          name
          status
          project{name,status,startDate,endDate,createdAt,updatedAt}
          startDate
          endDate
        }
      }
    `;

    this.apollo
      .mutate({
        mutation: EDIT_CAMP,
        variables: {
          campName:  this.campForm.controls['name'].value,
          project : this.projectId,
          status: this.campForm.controls['status'].value,
          startDate: startDate,
          endDate: endDate,
          campId: this.campId, 
        },
      })
      .subscribe(
        (result) => {
          this.router.navigate(['/viewCamp']);
          console.log('Success');
        },
        (error) => {
          console.log('there was an error sending the query', error);
        }
      );
  }

  /** Get Project List to display the available projects */
  private getProjectsList() {
    this.apollo
      .watchQuery({
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
      .valueChanges.subscribe((result) => {
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
      .watchQuery({
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
      .valueChanges.subscribe((result) => {
        this.responseGetter = result.data;
        this.projectId = this.responseGetter.camp.project._id;
        var startdate = (this.responseGetter.camp.startDate != null) ? new Date(Number.parseInt(this.responseGetter.camp.startDate))
        .toISOString()
        .substring(0, 10) : null;
      var enddate = (this.responseGetter.camp.endDate != null) ? new Date(Number.parseInt(this.responseGetter.camp.endDate))
        .toISOString()
        .substring(0, 10) : null;

        this.campForm.patchValue({
          name: this.responseGetter.camp.name,
          status: this.responseGetter.camp.status,
          address: this.responseGetter.camp.address,
          project: this.responseGetter.camp.project.name,
          startDate: startdate,
          endDate: enddate,
        });
      });
  }

  public onProjectChange(project : any){
     this.projectId = project._id;
  }

  ngOnInit(): void {
    this.getCampDetailsForEdit();
  }
}
