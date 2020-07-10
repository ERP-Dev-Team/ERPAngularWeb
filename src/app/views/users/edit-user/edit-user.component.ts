import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { FormGroup, FormControl, Validators } from '@angular/forms';

const DESIGNATIONSQUERY = gql`
  query {
    designations {
      _id
      name
      createdAt
      updatedAt
    }
  }
`;

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
})
export class EditUserComponent implements OnInit {
  public designationsList: any[];
  private responseGetter: any;
  private selectedDesignationId: any;

  public userForm = new FormGroup({
    userName: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    phone1: new FormControl('', Validators.required),
    phone2: new FormControl('', Validators.required),
    phoneIMEI: new FormControl('', Validators.required),
    address1: new FormControl('', Validators.required),
    address2: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    state: new FormControl('', Validators.required),
    country: new FormControl('', Validators.required),
    zipcode: new FormControl('', Validators.required),
    joiningPlace: new FormControl('', Validators.required),
    joiningDate: new FormControl('', Validators.required),
    dateOfBirth: new FormControl('', Validators.required),
    qualification: new FormControl('', Validators.required),
    salary: new FormControl('', Validators.required),
    batta: new FormControl('', Validators.required),
    salaryEffectiveDate: new FormControl('', Validators.required),
    salaryOld: new FormControl('', Validators.required),
    battaOld: new FormControl('', Validators.required),
    loginAllowed: new FormControl('', Validators.required),
    lastLogin: new FormControl('', Validators.required),
    lastLoginDevice: new FormControl('', Validators.required),
    refPerson: new FormControl('', Validators.required),
    refPersonPhone: new FormControl('', Validators.required),
    refPersonAddress: new FormControl('', Validators.required),
    IMEIAllowed: new FormControl('', Validators.required),
    bankAccountNumber: new FormControl('', Validators.required),
    bankName: new FormControl('', Validators.required),
    bankBranchName: new FormControl('', Validators.required),
    bankBranchCity: new FormControl('', Validators.required),
    bankIIFSCCode: new FormControl('', Validators.required),
    bankAccountHolderName: new FormControl('', Validators.required),
    designation: new FormControl('', Validators.required),
  });

  constructor(
    private apollo: Apollo,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  private getAvailableDesignations() {
    this.apollo
      .query({
        query: DESIGNATIONSQUERY,
      })
      .subscribe((result) => {
        this.responseGetter = result.data;
        this.designationsList = this.responseGetter.designations;
      });
  }

  public onChangeDesignation(designation: any) {
    this.selectedDesignationId = designation._id;
  }

  public editUser() {
    console.log(this.userForm.value);
  }

  ngOnInit(): void {
    this.getAvailableDesignations();
  }
}
