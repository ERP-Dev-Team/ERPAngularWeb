import { Injectable } from '@angular/core';
import { Query } from 'apollo-angular';
import gql from 'graphql-tag';
@Injectable({
  providedIn: 'root'
})
export class GetWorkTypeService extends Query {

  document = gql`query{
    workType(_id: $workTypeId) {
      _id,
      name,
      unit{name},
      createdAt,
      updatedAt
    }
  }`
}
