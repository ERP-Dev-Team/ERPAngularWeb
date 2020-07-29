import { Injectable } from '@angular/core';
import { Query } from 'apollo-angular';
import gql from 'graphql-tag';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AllProjectsService extends Query {
  document = gql`
    query {
      projects {
        _id
        name
        status
        startDate
        endDate
        createdAt
        updatedAt
      }
    }
  `;

  private _response;

  set Response(value: any) {
    this._response = value;
  }

  get projectDashboardDetails(): any {
    return this.apollo.query({
      query: gql`
        {
          projectDashboard {
            openProjects
            pausedProjects
            closedProjects
            terminatedProjects
          }
        }
      `,
    });
  }
}
