import { Injectable } from '@angular/core';
import { Mutation } from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root'
})
export class AddSupplierTypeService extends Mutation {

  document = gql`mutation createSupplierType($supplierTypeInput:SupplierTypeInput){
    createSupplierType(supplierTypeInput:$supplierTypeInput){
      _id,
      name
    }
  }
  `
}
