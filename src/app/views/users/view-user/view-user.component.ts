import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent implements OnInit {

  constructor(private apollo: Apollo, private route: ActivatedRoute, private router: Router) { 

  }

  public navigateToUser(){
    this.router.navigateByUrl('/editUser')
  }
  public  navigatetoAddUser(){
    this.router.navigateByUrl('/addUser')
  }
 

  ngOnInit(): void {
  }

}
