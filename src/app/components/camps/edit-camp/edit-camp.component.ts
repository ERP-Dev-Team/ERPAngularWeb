import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { DateHandler } from '../../../handlerClass/date-handler';
import { AllProjectsService } from '../../../services/project//allProject/all-projects.service';
import { EditCampsService } from '../../../services/camp/editCamp/edit-camps.service';



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
    private router: Router,
    private allProjectsGQL: AllProjectsService,
    private editCampGQL : EditCampsService
  ) {
    this.getProjectsList();
  }

  onSubmit() {

    var startDateStr = datehandler.convertDatetoTimeStamp(
      this.campForm.controls['startDate'].value
    );
    var endDateStr = datehandler.convertDatetoTimeStamp(
      this.campForm.controls['endDate'].value
    );

    this.editCampGQL.mutate({
          campName: this.campForm.controls['name'].value,
          project: this.campForm.controls['project'].value,
          status: this.campForm.controls['status'].value,
          startDate: startDateStr,
          endDate: endDateStr,
          campId: this.campId,
          address: this.campForm.controls['address'].value,
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
    this.allProjectsGQL.fetch({
      fetchPolicy: 'network-only',
    }).subscribe((result) => {
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
