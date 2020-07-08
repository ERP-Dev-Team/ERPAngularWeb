import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

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

  onSubmit() {
    console.log(this.campForm.value);
    var campName = this.campForm.controls['name'].value;
    var status = this.campForm.controls['status'].value;
    var startDate = this.campForm.controls['startDate'].value;
    var endDate = this.campForm.controls['endDate'].value;
    var project = this.campForm.controls['project'].value;
    this.projectList.forEach((element) => {
      if (project == element.name) {
        project = element._id;
      }
    });
    startDate = '' + new Date(startDate).getTime();
    endDate = '' + new Date(endDate).getTime();

    var CREATE_CAMP = gql`
      mutation createCampFunction(
        $campName: String!
        $status: String!
        $startDate: String!
        $endDate: String!
        $project: ID!
      ) {
        createCamp(
          campInput: {
            name: $campName
            status: $status
            project: $project
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
          campName: campName,
          project: project,
          status: status,
          startDate: startDate,
          endDate: endDate,
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

  ngOnInit(): void {}
}
