import { Injectable } from '@angular/core';
import { Mutation } from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root'
})
export class EditWorkTypeService extends Mutation {

  document = gql`mutation updateWorkType($id:ID!,$name:String,$unit:ID){
    updateWorkType(_id:$id,name:$name,unit:$unit){
      _id,
      name,
      unit{name},
      createdAt,
      updatedAt
    }
  }`
}
