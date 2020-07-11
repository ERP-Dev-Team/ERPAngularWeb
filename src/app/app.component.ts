import { Component } from '@angular/core';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private apollo: Apollo) {}

  title = 'ERP';
   onPress() :void{
    this.apollo
    .query({
      query: gql`
        {
          login(userName:"admin",password:"admin1234"){
           userName,
           token,
           tokenExpiration
          }
        }
      `,
    })
    .subscribe(result => {
     console.log(result)
    });                                      
  }
}
