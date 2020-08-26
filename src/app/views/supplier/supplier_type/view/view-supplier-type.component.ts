import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {ViewSupplierTypeService} from '../../../../services/supplier/supplier-type/view/view-supplier-type.service';

@Component({
  selector: 'app-view-supplier-type',
  templateUrl: './view-supplier-type.component.html',
  styleUrls: ['./view-supplier-type.component.css']
})
export class ViewSupplierTypeComponent implements OnInit {
  supplierTypesList: any;

  constructor(
    private router: Router,
    private viewSupplierTypesGQL: ViewSupplierTypeService
  ) {
    this.viewSupplierTypesGQL
      .fetch({
        fetchPolicy: 'network-only',
      })
      .subscribe((result) => {
        this.supplierTypesList = result.data['suppliertypes'];
      });
  }

  ngOnInit(): void {
  }

  addSupplierType() {
    this.router.navigate(['/addSupplierType']);
  }

  onSupplierTypeEdit(supplierType) {
    this.router.navigate(['/editSupplierType'], { queryParams: { id: supplierType._id }, skipLocationChange: true })
  }

}
