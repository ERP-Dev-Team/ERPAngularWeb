import { Injectable } from '@angular/core';
import { Mutation } from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root'
})
export class AddWorkTypeService extends Mutation {

  document = gql`mutation createWorkType($workTypeInput:WorkTypeInput){
    createWorkType(workTypeInput:$workTypeInput){
      _id,
      name,
      unit{name},
      createdAt,
      updatedAt
    }
  }`
}
