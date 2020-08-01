import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { DateHandler } from '../../../handlerClass/date-handler';
import { AddProjectService } from '../../../services/project//addProject/add-project.service';

var datehandler = new DateHandler();

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
    private router: Router,
    private projectGQL: AddProjectService
  ) {}

  ngOnInit(): void {}

  onSubmit() {

    var startDateStr = datehandler.convertDatetoTimeStamp(
      this.projectForm.controls['startDate'].value
    );
    var endDateStr = datehandler.convertDatetoTimeStamp(
      this.projectForm.controls['endDate'].value
    );

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

    this.projectGQL.mutate({
          projectName: this.projectForm.controls['name'].value,
          status: this.projectForm.controls['status'].value,
          startDate: startDateStr,
          endDate: endDateStr,
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
