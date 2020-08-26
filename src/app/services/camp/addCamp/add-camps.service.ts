import { Injectable } from '@angular/core';
import {Mutation} from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root'
})
export class AddCampsService extends Mutation {

  document = gql`
  mutation createCampFunction(
    $campName: String!
    $status: String!
    $startDate: String
    $endDate: String
    $project: ID!
    $address: String
  ) {
    createCamp(
      campInput: {
        name: $campName
        status: $status
        project: $project
        address: $address
        startDate: $startDate
        endDate: $endDate
      }
    ) {
      name
      status
    }
  }
`;

}
