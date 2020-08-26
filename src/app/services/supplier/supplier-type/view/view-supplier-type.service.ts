import { Injectable } from '@angular/core';
import { Query } from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root'
})
export class ViewSupplierTypeService extends Query {

  document = gql`query{
    suppliertypes{
      _id,
      name,
      createdAt,
      updatedAt
    }
  }`
}
