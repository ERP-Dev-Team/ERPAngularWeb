import { Injectable } from '@angular/core';
import { Mutation } from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root'
})
export class EditSupplierTypeService extends Mutation {

  document = gql`mutation updateSupplierType
  ($id:ID!,$name:String!){updateSupplierType(_id:$id,name:$name){
    _id,
    name
  }
}
`
}
