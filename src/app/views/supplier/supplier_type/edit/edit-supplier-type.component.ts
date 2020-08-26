import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { GetSupplierTypeService } from 'src/app/services/supplier/supplier-type/get/get-supplier-type.service';
import { EditSupplierTypeService } from 'src/app/services/supplier/supplier-type/edit/edit-supplier-type.service';
@Component({
  selector: 'app-edit-supplier-type',
  templateUrl: './edit-supplier-type.component.html',
  styleUrls: ['./edit-supplier-type.component.css']
})
export class EditSupplierTypeComponent implements OnInit {

  private supplierTypeId;
  private res:any;
  supplierTypeForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private editSupplierTypeGQL: EditSupplierTypeService,
    private getSupplierTypeGQL: GetSupplierTypeService,
  ) {
  }

  mapSupplierType() {
    this.getSupplierTypeGQL.fetch({
      supplierTypeId: this.supplierTypeId,
    }).subscribe((result) => {
      this.supplierTypeForm.patchValue({
        name: result.data['suppliertype'].name,
      });
    });
  }


  ngOnInit(): void {
    this.supplierTypeForm = new FormGroup({
      name: new FormControl('', Validators.required),
    });

    this.route.queryParams.subscribe((params) => {
      this.supplierTypeId = params['id'];
    });
    this.mapSupplierType();
  }

  updateSupplierType() {
    this.editSupplierTypeGQL.mutate({
      name: this.supplierTypeForm.controls['name'].value,
      id: this.supplierTypeId
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

