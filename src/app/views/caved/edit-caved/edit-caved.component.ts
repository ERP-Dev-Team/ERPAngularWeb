import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { FormGroup, FormControl, Validators } from '@angular/forms';

const ROLESQUERY = gql`
query{
  roles{_id,name,createdAt,updatedAt}
}
`;

@Component({
  selector: 'app-edit-caved',
  templateUrl: './edit-caved.component.html',
  styleUrls: ['./edit-caved.component.css']
})
export class EditCavedComponent implements OnInit {

  public dropdownRolesList : any[];
  public createdropdownRolesSettings: IDropdownSettings;
  public editdropdownRolesSettings: IDropdownSettings;
  public viewdropdownRolesSettings: IDropdownSettings;
  public approvedropdownRolesSettings: IDropdownSettings;
  public deletedropdownRolesSettings: IDropdownSettings;
  private roleresponseGetter: any;
  private moduleCavedId: any;

  public cavedForm = new FormGroup({
    create: new FormControl('', Validators.required),
    approval: new FormControl('', Validators.required),
    view: new FormControl('', Validators.required),
    edit: new FormControl('', Validators.required),
    delete: new FormControl('', Validators.required), })

  constructor(
    private apollo: Apollo,
    private route: ActivatedRoute,
    private router: Router
  ) { this.getAvailableRoles();
    this.getModuleId()
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
    console.log(this.cavedForm.value)
  }

  private getModuleId(){
    this.route.queryParams.subscribe( params =>{
        this.moduleCavedId = params['mID']
        console.log('This is the id ' + this.moduleCavedId
        // trigger callback function for querying module using Id
        );
    })
  }
  ngOnInit(): void {

    this.createdropdownRolesSettings = {
      singleSelection: false,
      idField: '_id',
      textField: 'name',
      enableCheckAll: false,
      searchPlaceholderText: 'Search roles',
      allowSearchFilter: true
    };
   
  }

}
