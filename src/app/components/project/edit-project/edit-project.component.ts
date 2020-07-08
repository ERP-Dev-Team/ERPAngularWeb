import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

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
     
      var sdate = params.startDate !=null ? new Date(Number.parseInt(params.startDate))
        .toISOString()
        .substring(0, 10) : null;
      var edate = params.endDate !=null ? new Date(Number.parseInt(params.endDate))
        .toISOString()
        .substring(0, 10) : null;
      this.projectForm.patchValue({
        name: params.name,
        status: JSON.stringify(params.status),
        startDate: sdate,
        endDate: edate,
      });
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    console.log(this.projectForm.value);

    var startDate = '' + new Date(this.projectForm.controls['startDate'].value).getTime();
    var endDate =  '' + new Date(this.projectForm.controls['endDate'].value).getTime();
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
          projectId: this.projectId ,
          status: status,
          name: this.projectForm.controls['name'].value,
          startDate: startDate ,
          endDate: endDate,
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
