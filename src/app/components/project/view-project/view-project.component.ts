import { Component, OnInit } from '@angular/core';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';
import {  Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-project',
  templateUrl: './view-project.component.html',
  styleUrls: ['./view-project.component.css']
})
export class ViewProjectComponent implements OnInit {

  projectList: any;
  responseGetter: any;

  constructor(private apollo: Apollo, private route: ActivatedRoute ,  private router: Router ) {
    this.apollo
    .watchQuery({
      query: gql`
        {
          projects{
            _id,
            name,
            status,
            startDate,
            endDate,
            createdAt,
            updatedAt
          }
        }
      `, 
    })
    .valueChanges.subscribe(result => {
       this.responseGetter=(result.data);
        this.projectList = this.responseGetter.projects;
    });
  }

 public onProjectEdit(event: any){
    
    this.router.navigate(['/editProject'],{queryParams: event, skipLocationChange: true})
  }

  public navigativeToAddProject(){
    this.router.navigate(['/addProject'])
  }

  ngOnInit(): void {
        
  }

}
