import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

const DESIGNATIONSQUERY = gql`
  query {
    designations {
      _id
      name
    }
  }
`;

const CAMPSQUERY = gql`
query{
  camps{_id,name,status,project{name,status,startDate,endDate,createdAt,updatedAt},startDate,endDate,createdAt,updatedAt}
}
`

const ROLESQUERY = gql`
query{
  roles{_id,name,createdAt,updatedAt}
}
`;

const MODULESQUERY = gql`
{
  modules {
    _id
    name
    caved {
      _id,
      create {
        _id
        name
      }
      approval {
        _id
        name
      }
      view {
        _id
        name
      }
      edit {
        _id
        name
      }
      delete {
        _id
        name
      }
    }
  }
}
`;

const USER_QUERY = gql`
query getUserById($userId: ID!){
  user(_id:$userId){
    userName,
    password,
    firstName,
    lastName,
    email,
    phone1,
    phone2,
    phoneIMEI,
    address1,
    address2,
    city,
    state,
    country,
    zipcode,
    joiningPlace,
    joiningDate,
    dateOfBirth,
    qualification,
    salary,
    batta,
    salaryEffectiveDate,
    salaryOld,
    battaOld,
    loginAllowed,
    lastLogin,
    lastLoginDevice,
    refPerson,
    refPersonPhone,
    refPersonAddress,
    IMEIAllowed,
    bankAccountNumber,
    bankName,
    bankBranchName,
    bankBranchCity,
    bankIIFSCCode,
    bankAccountHolderName,
    designation{
      _id,
      name
    },
    rolesAllowed{
      _id,
      name
    },
    modulesAllowed{
      _id,
      name,
    },
    campsAllowed{
      _id,
      name
    }
  }
}
`;

const UPDATE_USER = gql`
mutation updateUserFunction($userValue: UserEditInput!){
  updateUser(userEditInput:$userValue){
    userName,
    password,
    firstName
  }
}
`
@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
})
export class EditUserComponent implements OnInit {
  public userId: string;
  public designationsList: any[];
  private responseGetter: any;
  public selectedRolesList: any[];
  public dropdownRolesList: any[];
  public dropdownRolesSettings: IDropdownSettings;
  public selectedModulesList: any[];
  public dropdownModulesList: any[];
  public dropdownModulesSettings: IDropdownSettings;
  public dropdownCampsSettings: IDropdownSettings;
  public dropdownCampsList: any[];
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
    loginAllowed: new FormControl(true, Validators.required),
    lastLogin: new FormControl('', Validators.required),
    lastLoginDevice: new FormControl('', Validators.required),
    refPerson: new FormControl('', Validators.required),
    refPersonPhone: new FormControl('', Validators.required),
    refPersonAddress: new FormControl('', Validators.required),
    IMEIAllowed: new FormControl(false, Validators.required),
    bankAccountNumber: new FormControl('', Validators.required),
    bankName: new FormControl('', Validators.required),
    bankBranchName: new FormControl('', Validators.required),
    bankBranchCity: new FormControl('', Validators.required),
    bankIIFSCCode: new FormControl('', Validators.required),
    bankAccountHolderName: new FormControl('', Validators.required),
    designation: new FormControl('', Validators.required),
    modulesAllowed: new FormControl('', Validators.required),
    rolesAllowed: new FormControl('', Validators.required),
    campsAllowed: new FormControl('', Validators.required),
  });

  constructor(
    private apollo: Apollo,
    private route: ActivatedRoute,
    private router: Router
  ) { }

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

  private getAvailableModules() {
    this.apollo
      .query({
        query: MODULESQUERY,
      })
      .subscribe((result) => {
        //console.log(JSON.stringify(result));
        this.responseGetter = result.data;
        this.dropdownModulesList = this.responseGetter.modules;
      });
  }

  private getAvailableCamps() {
    this.apollo
      .query({
        query: CAMPSQUERY,
      })
      .subscribe((result) => {
        //console.log(JSON.stringify(result));
        this.responseGetter = result.data;
        this.dropdownCampsList = this.responseGetter.camps;
      });
  }

  private getAvailableRoles() {
    this.apollo
      .query({
        query: ROLESQUERY,
      })
      .subscribe((result) => {
        //console.log(JSON.stringify(result));
        this.responseGetter = result.data;
        this.dropdownRolesList = this.responseGetter.roles;
      });
  }

  public editUser() {
    this.mapListForIdElement('rolesAllowed');
    this.mapListForIdElement('modulesAllowed');
    this.mapListForIdElement('campsAllowed');

    this._editUser();
  }

  private mapListForIdElement(ngModelName: string) {
    var createRoleListObjects = this.userForm.controls[ngModelName].value;
    var createRoleListObjectsParsedIds = [];
    createRoleListObjects.forEach((element) => {
      createRoleListObjectsParsedIds.push(element._id);
    });
    this.userForm.controls[ngModelName].setValue(createRoleListObjectsParsedIds);
  }

  private _editUser() {
    console.log(this.userForm.value);
    this.apollo.mutate({
      mutation: UPDATE_USER,
      variables: { userValue: this.userForm.value }
    }).subscribe((result) => {
      console.log("UPDATED")
    }, (error) => {
      console.log(JSON.stringify(error));
    });
  }

  private getUser() {
    this.route.queryParams.subscribe(params => {
      this.userId = params['userId'];
      this.apollo.query({
        query: USER_QUERY,
        variables: { userId: this.userId }
      }).subscribe((result) => {
        this.responseGetter = result.data;
        console.log(this.responseGetter);
        this.userForm.setValue(this.responseGetter.user);
      }, (error) => {
        console.log(JSON.stringify(error));
      });
    });
  }

  ngOnInit(): void {
    this.dropdownRolesSettings = {
      singleSelection: false,
      idField: '_id',
      textField: 'name',
      enableCheckAll: false,
      searchPlaceholderText: 'Search roles',
      allowSearchFilter: true
    };
    this.dropdownModulesSettings = {
      singleSelection: false,
      idField: '_id',
      textField: 'name',
      enableCheckAll: false,
      searchPlaceholderText: 'Search modules',
      allowSearchFilter: true
    };
    this.dropdownCampsSettings = {
      singleSelection: false,
      idField: '_id',
      textField: 'name',
      enableCheckAll: false,
      searchPlaceholderText: 'Search camps',
      allowSearchFilter: true
    };

    this.getAvailableDesignations();
    this.getAvailableModules();
    this.getAvailableRoles();
    this.getAvailableCamps();
    this.getUser();
  }
}
