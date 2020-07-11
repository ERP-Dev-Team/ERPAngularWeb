import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';

@Component({
  selector: 'app-designations-set',
  templateUrl: './designations-set.component.html',
  styleUrls: ['./designations-set.component.css']
})
export class DesignationsSetComponent implements OnInit {

  public designationsList: any;
  private responseGetter: any;
  constructor(private apollo: Apollo,private router: Router,private route: ActivatedRoute) {
      this.getAvailableDesignations();
   }

  public navigativeToAddDesignation(){
    this.router.navigate(['/addDesignation'], {skipLocationChange: true})
  }

  private getAvailableDesignations(){
    this.apollo.query({
       query: gql `{
          designations{
          _id,
          name,
          }
       }`,
    }).subscribe( result =>{
        this.responseGetter = result.data;
        this.designationsList = this.responseGetter.designations;
    })
  }

  public onDesignationEdit(designation: any){
    this.router.navigate(['/editDesignation'], { queryParams :{designationId: designation._id},skipLocationChange: true})
    console.log(designation._id)
  }
  
  ngOnInit(): void {
  }

}
