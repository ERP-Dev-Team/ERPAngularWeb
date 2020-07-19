import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

const MODULE_QUERY =gql`
query{
  modules {
    _id,
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

const ROLESQUERY = gql`
query{
  roles{_id,name,createdAt,updatedAt}
}
`;

@Component({
  selector: 'app-caved',
  templateUrl: './caved.component.html',
  styleUrls: ['./caved.component.css']
})
export class CavedComponent implements OnInit {
  public modulesList;
  public selectedRolesList : any[];
  public dropdownRolesList : any[];
  public dropdownRolesSettings: IDropdownSettings;
  public editdropdownRolesSettings: IDropdownSettings;
  public approvedropdownRolesSettings: IDropdownSettings;
  public deletedropdownRolesSettings: IDropdownSettings;
  private responseGetter: any;
  private roleresponseGetter: any;
  constructor(
    private apollo: Apollo,
    private route: ActivatedRoute,
    private router: Router
  ) { 
       
    this. getAvailableModules();
    this.getAvailableRoles();
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

  private getAvailableModules() {
    this.apollo
      .query({
        query: MODULE_QUERY,
      })
      .subscribe((result) => {
        //console.log(JSON.stringify(result));
        this.responseGetter = result.data;
        this.modulesList = this.responseGetter.modules;
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
    this.deletedropdownRolesSettings = {
      singleSelection: false,
      idField: '_id',
      textField: 'name',
      enableCheckAll: false,
      searchPlaceholderText: 'Search roles',
      allowSearchFilter: true
    };
    this.editdropdownRolesSettings = {
      singleSelection: false,
      idField: '_id',
      textField: 'name',
      enableCheckAll: false,
      searchPlaceholderText: 'Search roles',
      allowSearchFilter: true
    };
    this.approvedropdownRolesSettings = {
      singleSelection: false,
      idField: '_id',
      textField: 'name',
      enableCheckAll: false,
      searchPlaceholderText: 'Search roles',
      allowSearchFilter: true
    };

  

  }

}
