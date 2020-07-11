import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css'],
})
export class AddProjectComponent implements OnInit {
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
  ) { }

  ngOnInit(): void { }

  onSubmit() {
    var projectName = this.projectForm.controls['name'].value;
    var status = this.projectForm.controls['status'].value;
    var startDate = new Date(this.projectForm.controls['startDate'].value).getTime();
    var endDate = new Date(this.projectForm.controls['endDate'].value).getTime();

    var startDateStr = "";
    var endDateStr = "";

    if (startDate > 0) {
      startDateStr = '' + new Date(this.projectForm.controls['startDate'].value).getTime();
    }
    if (endDate > 0) {
      endDateStr = '' + new Date(this.projectForm.controls['endDate'].value).getTime();
    }

    var CREATE_PROJECT = gql`
      mutation createProjectFunction(
        $projectName: String!
        $status: String!
        $startDate: String!
        $endDate: String!
      ) {
        createProject(
          projectInput: {
            name: $projectName
            status: $status
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
        mutation: CREATE_PROJECT,
        variables: {
          projectName: projectName,
          status: status,
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
          console.log(JSON.stringify(error));
        }
      );
  }
}
