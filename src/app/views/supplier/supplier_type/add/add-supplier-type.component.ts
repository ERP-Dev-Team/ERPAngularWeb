import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AddSupplierTypeService } from '../../../../services/supplier/supplier-type/add/add-supplier-type.service';

@Component({
  selector: 'app-add-supplier-type',
  templateUrl: './add-supplier-type.component.html',
  styleUrls: ['./add-supplier-type.component.css']
})
export class AddSupplierTypeComponent implements OnInit {
  supplierTypeForm: FormGroup;

  constructor(
    private router: Router,
    private addSupplierTypeGQL: AddSupplierTypeService
  ) {
  }

  ngOnInit(): void {
    this.supplierTypeForm = new FormGroup({
      name: new FormControl('', Validators.required),
    });
  }

  onAddSupplierType() {
    this.addSupplierTypeGQL
      .mutate({
        supplierTypeInput: {
          name: this.supplierTypeForm.controls['name'].value
        },
      }).subscribe(
        (result) => {
          this.router.navigate(['/viewSupplierTypes']);
        },
        (error) => {
          console.log(JSON.stringify(error));
        }
      );
  }
}
