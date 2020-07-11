import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd, NavigationStart } from '@angular/router';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';

@Component({
  selector: 'app-view-item',
  templateUrl: './view-item.component.html',
  styleUrls: ['./view-item.component.css']
})
export class ViewItemComponent implements OnInit {

  public itemsList: any;
  private responseGetter: any;
  constructor(private apollo: Apollo,private router: Router,private route: ActivatedRoute) {
    this.getAvailableItems();

   }

  public navigativeToAddItem(){
    this.router.navigate(['/addItem'], {skipLocationChange: true})
  }

  private getAvailableItems(){
    this.apollo.query({
       query: gql `{
        items{
          _id
          name
          description
          partNumber
          unit {
            _id
            name
          }
          hsnNumber
          itemCode
          itemCategory {
            _id
            name
          }
          createdAt
          updatedAt
        }
        }`,
    }).subscribe( result =>{
        this.responseGetter = result.data;
        this.itemsList = this.responseGetter.items;
    })
  }

  public onItemEdit(item: any){
    this.router.navigate(['/editItem'], { queryParams :{itemId: item._id},skipLocationChange: true})
    console.log(item._id)
  }

  ngOnInit(): void {
  }

}
