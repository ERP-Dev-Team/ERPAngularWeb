import { Injectable } from '@angular/core';
import { Query } from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root'
})
export class ViewUnitService  extends Query {
  
  document = gql `query{
    units{_id,name}
   }`
}
