import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';


@Component({
  selector: 'app-view-role',
  templateUrl: './view-role.component.html',
  styleUrls: ['./view-role.component.css']
})
export class ViewRoleComponent implements OnInit {

  public rolesList: any;
  private responseGetter: any;
  constructor(private apollo: Apollo,private router: Router,private route: ActivatedRoute) {
      this.getAvailableRoles();
   }

  public navigativeToAddRole(){
    this.router.navigate(['/addRole'], {skipLocationChange: true})
  }

  private getAvailableRoles(){
    this.apollo.query({
       query: gql `{
          roles{
            name,
            _id
          }
       }`,
    }).subscribe( result =>{
        this.responseGetter = result.data;
        this.rolesList = this.responseGetter.roles;
    })
  }

  public onRoleEdit(role: any){
    this.router.navigate(['/editRole'], { queryParams :{roleId: role._id},skipLocationChange: true})
    console.log(role._id)
  }

  public isEditAllowed(args){
    if(args != "ADMIN"){
    return false;
    }else{
      return true;
    }
  }

  public isDeleteAllowed(args){
    if(args != "ADMIN"){
      return false;
      }else{
        return true;
      }
  }
  
  ngOnInit(): void {
  }

}
