import { Injectable } from '@angular/core';
import { Query } from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root'
})
export class AllCampsService extends Query {
   document = gql`
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
 `;
 
}
