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

@Component({
  selector: 'app-caved',
  templateUrl: './caved.component.html',
  styleUrls: ['./caved.component.css']
})
export class CavedComponent implements OnInit {
  public modulesList;
  private responseGetter: any;
  constructor(
    private apollo: Apollo,
    private route: ActivatedRoute,
    private router: Router
  ) { 
       
    this. getAvailableModules();
  }

  private getAvailableModules() {
    this.apollo
      .query({
        query: MODULE_QUERY,
        fetchPolicy: 'network-only',
      })
      .subscribe((result) => {
        //console.log(JSON.stringify(result));
        this.responseGetter = result.data;
        this.modulesList = this.responseGetter.modules;
      });
  }
  public navigateToEditCaved(module : any){
    console.log(module)
    this.router.navigate(['/editCaved'], {queryParams : {mID : module._id,cID:module.caved._id}, skipLocationChange: true})
  }

  ngOnInit(): void {
  

  }

}
