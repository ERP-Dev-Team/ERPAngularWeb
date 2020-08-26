import { Injectable } from '@angular/core';
import { Query } from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root'
})
export class GetSupplierTypeService extends Query {

  document = gql`query getSupplierTypeById($supplierTypeId: ID!){
    suppliertype(_id:$supplierTypeId){
      _id,
      name,
      createdAt,
      updatedAt
    }
  }`
}
