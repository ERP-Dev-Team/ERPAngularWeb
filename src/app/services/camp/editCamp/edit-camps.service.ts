import { Injectable } from '@angular/core';
import {Mutation} from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root'
})
export class EditCampsService extends Mutation {

  document = gql`
  mutation editCampFunction(
    $campName: String!
    $status: String!
    $startDate: String!
    $endDate: String!
    $project: ID!
    $campId: ID!
    $address: String
  ) {
    updateCamp(
      _id: $campId
      name: $campName
      status: $status
      project: $project
      startDate: $startDate
      endDate: $endDate
      address: $address
    ) {
      name
      status
      project {
        name
        status
        startDate
        endDate
        createdAt
        updatedAt
      }
      startDate
      endDate
    }
  }
`;
}
