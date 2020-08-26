import { Injectable } from '@angular/core';
import { Query } from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root'
})
export class ViewWorkTypeService extends Query {

  document = gql`query{
    worktypes{
      _id,
      name,
      unit{name},
      createdAt,
      updatedAt
    }
  }`
}
