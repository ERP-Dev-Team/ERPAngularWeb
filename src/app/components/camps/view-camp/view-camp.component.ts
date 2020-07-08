import { Component, OnInit } from '@angular/core';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';
import {  Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-camp',
  templateUrl: './view-camp.component.html',
  styleUrls: ['./view-camp.component.css']
})
export class ViewCampComponent implements OnInit {

  campList: any;
  responseGetter: any;
  constructor(private apollo: Apollo, private route: ActivatedRoute ,  private router: Router ) {
    this.apollo
    .watchQuery({
      query: gql`
        {
          camps{
            _id,
            name,
            status,
            address,
            startDate,
            endDate,
            createdAt,
            updatedAt,
            project{name,status,startDate,endDate,createdAt,updatedAt}
          }
        }
      `, 
    })
    .valueChanges.subscribe(result => {
       this.responseGetter=(result.data);
        this.campList = this.responseGetter.camps;
    });
  }


  onCampEdit(camp: any){
    this.router.navigate(['/editCamp'], {queryParams : {pID : camp._id}, skipLocationChange: true})
    console.log(camp._id)
  }

  navigativeToAddCamp(){
     this.router.navigate(['/addCamp']);
  }

  
  ngOnInit(): void {
  }

}
