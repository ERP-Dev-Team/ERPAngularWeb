import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ViewWorkTypeService } from 'src/app/services/workType/view-work-type/view-work-type.service';
import { EditWorkTypeService } from 'src/app/services/workType/edit-work-type/edit-work-type.service';
import { GetWorkTypeService } from 'src/app/services/workType/get-work-type/get-work-type.service';
import { ViewUnitService } from 'src/app/services/unit/view-unit/view-unit.service';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
@Component({
  selector: 'app-edit-work-type',
  templateUrl: './edit-work-type.component.html',
  styleUrls: ['./edit-work-type.component.css']
})
export class EditWorkTypeComponent implements OnInit {

  private res;
  private workTypeId;
  workTypesList: any;
  unitsLit: any;
  workTypeForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apollo: Apollo,
    private viewWorkTypesGQL: ViewWorkTypeService,
    private editWorkTypesGQL: EditWorkTypeService,
    private getWorkTypesGQL: GetWorkTypeService,
    private viewUnitsGQL: ViewUnitService
  ) {
    this.getUnitsList();
  }

  mapWorkType() {
    this.getWorkTypesGQL.fetch({
      workTypeId: this.workTypeId,
    }).subscribe((result) => {
      this.res = result.data;
      this.workTypeForm.patchValue({
        name: this.res.workType.name,
        unit: this.fetchUnit_byKey('_id', this.res.workType.unit).name,
      });
    });
  }

  fetchUnit_byKey(key:any, val:any) {
    for (let unit of this.unitsLit) {
      if (unit[key] === val) {
        return unit;
      }
    }
    return null;
  }

  getUnitsList() {
    this.viewUnitsGQL.fetch({
      fetchPolicy: 'network-only',
    }).subscribe((result) => {
      this.res = result.data;
      this.unitsLit = this.res.units;
    });
  }

  ngOnInit(): void {
    this.workTypeForm = new FormGroup({
      name: new FormControl('', Validators.required),
      unit: new FormControl('', Validators.required),
    });

    this.route.queryParams.subscribe((params) => {
      this.workTypeId = params['id'];
    });
    this.mapWorkType();
  }

  updateWorkType() {
    this.editWorkTypesGQL.mutate({
      name: this.workTypeForm.controls['name'].value,
      unit: this.workTypeForm.controls['unit'].value,
      workTypeId: this.workTypeId
    }).subscribe(
      (result) => {
        this.router.navigate(['/viewWorkTypes']);
      },
      (error) => {
        console.log(JSON.stringify(error));
      }
    );
  }

}
