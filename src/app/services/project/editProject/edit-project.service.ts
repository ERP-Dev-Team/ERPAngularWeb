import { Injectable } from '@angular/core';
import {Mutation} from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root'
})
export class EditProjectService extends Mutation {

  document = gql `
  mutation editProjectFunction(
    $status: String!
    $projectId: ID!
    $name: String!
    $startDate: String!
    $endDate: String!
  ) {
    updateProject(
      _id: $projectId
      status: $status
      name: $name
      startDate: $startDate
      endDate: $endDate
    ) {
      name
      status
      startDate
      endDate
    }
  }
`;
}
