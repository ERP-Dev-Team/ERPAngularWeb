import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import {  FormGroup, FormControl, Validators } from '@angular/forms';

const ROLESQUERY = gql`
query{
  roles{_id,name,createdAt,updatedAt}
}
`;

const CAVED_BY_ID_QUERY = gql`query getModuleCavedById($moduleId: ID!) {
  getModuleCavedById(_id: $moduleId) {
    _id
    create {
      _id,
      name
    }
    approval {
      _id,
      name
    }
    view {
      _id,
      name
    }
    edit {
      _id,
      name
    }
    delete {
      _id,
      name
    }
  }
}
`;

const UPDATE_CAVED = gql`
mutation updateCaved($_id: ID!,$create: [ID!],$approval: [ID!],$view: [ID!],$edit: [ID!],$delete: [ID!]){
  updateCaved(cavedEditInput:{_id:$_id,create:$create,approval:$approval,view:$view,edit:$edit,delete:$delete}){
    _id,
    create{name},
    approval{name},
    view{name},
    edit{name},
    delete{name}
  }
}
`

@Component({
  selector: 'app-edit-caved',
  templateUrl: './edit-caved.component.html',
  styleUrls: ['./edit-caved.component.css']
})
export class EditCavedComponent implements OnInit {

  public dropdownRolesList: any[];
  public createdropdownRolesSettings: IDropdownSettings;
  public editdropdownRolesSettings: IDropdownSettings;
  public viewdropdownRolesSettings: IDropdownSettings;
  public approvedropdownRolesSettings: IDropdownSettings;
  public deletedropdownRolesSettings: IDropdownSettings;
  private roleresponseGetter: any;
  private moduleId: any;
  private responseGetter: any;
  private cavedEditForm: HTMLElement;

  public cavedForm = new FormGroup({
    _id:new FormControl('',Validators.required),
    create: new FormControl('', Validators.required),
    approval: new FormControl('', Validators.required),
    view: new FormControl('', Validators.required),
    edit: new FormControl('', Validators.required),
    delete: new FormControl('', Validators.required),
  })

  constructor(
    private apollo: Apollo,
    private route: ActivatedRoute,
    private router: Router
  ) {

  }

  private getAvailableRoles() {
    this.apollo
      .query({
        query: ROLESQUERY,
      })
      .subscribe((result) => {
        //console.log(JSON.stringify(result));
        this.roleresponseGetter = result.data;
        this.dropdownRolesList = this.roleresponseGetter.roles;
      });
  }

  public editCaved(){
    this.mapListForIdElement("create");
    this.mapListForIdElement("approval");
    this.mapListForIdElement("view");
    this.mapListForIdElement("edit");
    this.mapListForIdElement("delete");

    this._editCaved();
  }

  private mapListForIdElement( ngModelName:string){
    var createRoleListObjects = this.cavedForm.controls[ngModelName].value;
    var createRoleListObjectsParsedIds = [];
    createRoleListObjects.forEach((element)=>{
      createRoleListObjectsParsedIds.push(element._id);
    });
    this.cavedForm.controls[ngModelName].setValue(createRoleListObjectsParsedIds);
  }

  private _editCaved() {
    console.log(this.cavedForm.value);
    this.apollo.mutate({
      mutation:UPDATE_CAVED,variables:this.cavedForm.value
    }).subscribe((result)=>{
      console.log("UPDATED!");
      this.router.navigateByUrl('/viewCaved')
    },(error)=>{
      console.log(JSON.stringify(error));
      this.router.navigateByUrl('/viewCaved')
    })
  }

  public getModuleId() {
    this.route.queryParams.subscribe(params => {
      this.moduleId = params['mID']
      this.cavedForm.controls['_id'].setValue(params['cID']);
      console.log('This is the id ' + this.moduleId);
      // trigger callback function for querying module using Id
      this.apollo.query({
        query: CAVED_BY_ID_QUERY,
        variables: { moduleId: this.moduleId }
      }).subscribe((result) => {
        this.responseGetter = result.data;
        console.log(JSON.stringify(this.responseGetter.getModuleCavedById.view));
 
        //this.cavedForm.controls['view'].setValue(this.responseGetter.getModuleCavedById.view);
        this.cavedForm.patchValue({
          view:this.responseGetter.getModuleCavedById.view,
          create:this.responseGetter.getModuleCavedById.create,
          edit:this.responseGetter.getModuleCavedById.edit,
          approval:this.responseGetter.getModuleCavedById.view,
          delete:this.responseGetter.getModuleCavedById.delete
        });

        this.cavedEditForm.click();
      }, (error) => {
        console.log(JSON.stringify(error));

      });

    })
  }
  ngOnInit(): void {
 this.cavedEditForm=document.getElementById('editCavedForm') as HTMLElement;
    this.createdropdownRolesSettings = {
      singleSelection: false,
      idField: '_id',
      textField: 'name',
      enableCheckAll: false,
      searchPlaceholderText: 'Search roles',
      allowSearchFilter: true
    };

    this.getAvailableRoles();
    this.getModuleId()

  }

}
