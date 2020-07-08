import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

declare interface NavList{
    path: String,
    icon: String,
    menuName: String
}


export const navItems: NavList[] = [
  { path: '/viewProject', icon: "../../../assets/menuicons/ic_projects.png", menuName: ' Projects' },
  { path: '/viewCamp', icon: "../../../assets/menuicons/ic_camps.png", menuName: ' Camps' },
  { path: '/viewRole', icon: "../../../assets/menuicons/ic_roles.png", menuName: ' Roles' },
  { path: '/viewDesignation', icon: "../../../assets/menuicons/ic_designations.png", menuName: ' Designations' },
  { path: '/viewItem', icon: "../../../assets/menuicons/ic_items.png", menuName: ' Items' },
  { path: '/viewUnit', icon: "../../../assets/menuicons/ic_units.png", menuName: ' Units' },
  { path: '/viewProject', icon: "../../../assets/menuicons/ic_suppliers.png", menuName: ' Suppliers' },
  { path: '/viewProject', icon: "../../../assets/menuicons/ic_users.png", menuName: 'Users' },
  { path: '/viewProject', icon: "../../../assets/menuicons/ic_vehicles.png", menuName: 'Vehicles' },
  { path: '/viewProject', icon: "../../../assets/menuicons/ic_vehicletypes.png", menuName: 'Vehicle Types' },
  

];



@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {
 

  navItemS: any[];
  

  constructor(
    private apollo: Apollo,
    private route: ActivatedRoute,
    private router: Router
  ) {
  

  }




  ngOnInit(): void {
     this.navItemS = navItems.filter(navItem => navItem);

  }

}
