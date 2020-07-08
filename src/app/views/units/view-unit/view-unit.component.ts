import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd, NavigationStart } from '@angular/router';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';

@Component({
  selector: 'app-view-unit',
  templateUrl: './view-unit.component.html',
  styleUrls: ['./view-unit.component.css']
})
export class ViewUnitComponent implements OnInit {

  public unitsList: any;
  private responseGetter: any;
  constructor(private apollo: Apollo,private router: Router,private route: ActivatedRoute) {
    this.getAvailableUnits();

    this.router.events.subscribe((e) => {
         this.getAvailableUnits();
   });
   }

  public navigativeToAddUnit(){
    this.router.navigate(['/addUnit'], {skipLocationChange: true})
  }

  private getAvailableUnits(){
    this.apollo.watchQuery({
       query: gql `{
          units{
            _id,
            name
          }
        }`,
    }).valueChanges.subscribe( result =>{
        this.responseGetter = result.data;
        this.unitsList = this.responseGetter.units;
    })
  }

  public onUnitEdit(unit: any){
    this.router.navigate(['/editUnit'], { queryParams :{unitId: unit._id},skipLocationChange: true})
    console.log(unit._id)
  }

  ngOnInit(): void {
    
  }

}
