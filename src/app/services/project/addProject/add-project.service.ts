import { Injectable } from '@angular/core';
import {Mutation} from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root'
})
export class AddProjectService extends Mutation{

  document = gql `
  mutation createProjectFunction(
    $projectName: String!
    $status: String!
    $startDate: String
    $endDate: String
  ) {
    createProject(
      projectInput: {
        name: $projectName
        status: $status
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
