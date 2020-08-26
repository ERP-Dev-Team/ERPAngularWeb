import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AddWorkTypeService } from '../../../services/workType/add-work-type/add-work-type.service';
import { ViewUnitService } from 'src/app/services/unit/view-unit/view-unit.service';

@Component({
  selector: 'app-add-work-type',
  templateUrl: './add-work-type.component.html',
  styleUrls: ['./add-work-type.component.css']
})
export class AddWorkTypeComponent implements OnInit {
  res;
  unitsList;
  workTypeForm: FormGroup;

  constructor(
    private router: Router,
    private viewUnitsGQL: ViewUnitService,
    private addWorkTypeGQL: AddWorkTypeService
  ) {
    this.viewUnitsGQL.fetch({
      fetchPolicy: 'network-only',
    }).subscribe((result) => {
      this.res = result.data;
      this.unitsList = result.data['units'];
    });
  }

  ngOnInit(): void {
    this.workTypeForm = new FormGroup({
      name: new FormControl('', Validators.required),
      unit: new FormControl('', Validators.required),
    });
  }

  onAddWorkType() {
    this.addWorkTypeGQL
      .mutate({
        workTypeInput: {
          name: this.workTypeForm.controls['name'].value,
          unit: this.workTypeForm.controls['unit'].value
        },
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
